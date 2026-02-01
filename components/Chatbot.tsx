
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, Send, X, Volume2, Loader2 } from 'lucide-react';
import { gemini, GeminiService } from '../services/gemini';
import { SYSTEM_INSTRUCTION } from '../constants';
import { GoogleGenAI, Modality } from '@google/genai';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am Flow Energy AI. How can I assist you with our industrial solutions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice States
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Transcription buffers for voice-to-chat sync
  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');

  // Auto-popup on scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoOpened) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Check if we are within 100px of the bottom
      if (windowHeight + scrollTop >= documentHeight - 100) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAutoOpened]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await gemini.sendMessage(userText);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const startVoiceSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      currentInputTranscription.current = '';
      currentOutputTranscription.current = '';

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            setIsVoiceActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: GeminiService.encodeBase64(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                if (session) {
                  session.sendRealtimeInput({ media: pcmBlob });
                }
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            // Handle Transcriptions for Chat History Sync
            if (msg.serverContent?.inputTranscription) {
              currentInputTranscription.current += msg.serverContent.inputTranscription.text;
            }
            if (msg.serverContent?.outputTranscription) {
              currentOutputTranscription.current += msg.serverContent.outputTranscription.text;
            }

            // Sync to chat history when turn is complete
            if (msg.serverContent?.turnComplete) {
              const uText = currentInputTranscription.current;
              const mText = currentOutputTranscription.current;
              
              if (uText || mText) {
                setMessages(prev => {
                  const newMsgs = [...prev];
                  if (uText) newMsgs.push({ role: 'user', text: uText });
                  if (mText) newMsgs.push({ role: 'model', text: mText });
                  return newMsgs;
                });
              }
              currentInputTranscription.current = '';
              currentOutputTranscription.current = '';
            }

            // Handle Audio Output
            const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const audioCtx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const buffer = await GeminiService.decodeAudioData(
                GeminiService.decodeBase64(base64Audio),
                audioCtx,
                24000,
                1
              );
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Voice Error:', e);
            stopVoiceSession();
          },
          onclose: () => {
            console.log('Voice Closed');
            setIsVoiceActive(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION + "\nYou are in voice mode. Keep responses concise and natural for conversation.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start voice:', err);
      setIsVoiceActive(false);
      alert('Could not access microphone or start session.');
    }
  };

  const stopVoiceSession = () => {
    // 1. Close the session if it exists
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.error('Error closing session:', e);
      }
      sessionRef.current = null;
    }

    // 2. Stop all active audio playback
    sourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Source might have already stopped
      }
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;

    // 3. Update UI state
    setIsVoiceActive(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-[380px] h-[550px] mb-4 rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Flow Energy AI</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-slate-100 bg-slate-50">
            <button 
              onClick={() => { setMode('chat'); stopVoiceSession(); }}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${mode === 'chat' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-slate-500'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button 
              onClick={() => setMode('voice')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${mode === 'voice' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-slate-500'}`}
            >
              <Mic className="w-4 h-4" />
              <span>Talk</span>
            </button>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {mode === 'chat' ? (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' 
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isVoiceActive ? 'bg-blue-100 scale-110' : 'bg-slate-100'
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isVoiceActive ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isVoiceActive ? <Volume2 className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-2">
                    {isVoiceActive ? "Listening..." : "Voice Mode"}
                  </h5>
                  <p className="text-sm text-slate-500 px-8">
                    {isVoiceActive 
                      ? "I'm listening. Your conversation is being saved to the chat history." 
                      : "Speak directly with our AI assistant. Every turn will be transcribed to chat."}
                  </p>
                </div>
                {!isVoiceActive ? (
                  <button 
                    onClick={startVoiceSession}
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Start Talking
                  </button>
                ) : (
                  <button 
                    onClick={stopVoiceSession}
                    className="bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-red-500/20 active:scale-95 transition-all"
                  >
                    Stop Talking
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer Input for Chat */}
          {mode === 'chat' && (
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-500 transition-colors">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-sm px-3 focus:outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => {
          if (isOpen && isVoiceActive) stopVoiceSession();
          setIsOpen(!isOpen);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
          isOpen ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? <X /> : <MessageSquare className="group-hover:animate-bounce" />}
        {!isOpen && (
          <span className="absolute right-16 bg-white border border-slate-200 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            How can I help?
          </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
