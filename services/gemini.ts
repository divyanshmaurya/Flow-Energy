
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  // Fix: Removed private ai property and moved initialization to the method as per guidelines.
  // This ensures the latest API key is used and follows the best practice for @google/genai.

  async sendMessage(message: string, history: any[] = []) {
    try {
      // Fix: Initialize GoogleGenAI inside the method and use process.env.API_KEY directly without fallback.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const response = await chat.sendMessage({ message });
      // Fix: Direct access to the .text property (not text()) as per SDK documentation.
      return response.text || "No response generated.";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I apologize, but I encountered an error connecting to our systems. Please try again or contact us directly.";
    }
  }

  // Helper for voice decoding as per guidelines
  static decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  static encodeBase64(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  static async decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }
}

export const gemini = new GeminiService();
