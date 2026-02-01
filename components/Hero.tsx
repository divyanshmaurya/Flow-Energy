
import React from 'react';
import { ArrowRight, ShieldCheck, Globe, Factory } from 'lucide-react';

const Hero: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/90 to-blue-900/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Reliable Industrial Trading in UAE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Solutions</span> for <br />
              Oil & Gas Industry.
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Specializing in instrumentation, fittings, tubings, valves, pneumatics, pipes & fittings, safety and electrical consumables for the energy sector.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#catalog" 
                onClick={(e) => handleLinkClick(e, '#catalog')}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl shadow-blue-600/30 active:scale-95 group"
              >
                View Catalog
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-2xl font-bold transition-all active:scale-95"
              >
                Contact Sales
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/5 mt-8">
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2 text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Quality</span>
                </div>
                <p className="text-white font-bold text-sm">Certified Stock</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2 text-blue-400">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Reach</span>
                </div>
                <p className="text-white font-bold text-sm">UAE & Global</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2 text-blue-400">
                  <Factory className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Stock</span>
                </div>
                <p className="text-white font-bold text-sm">Prompt Supply</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
