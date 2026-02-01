
import React from 'react';
import { COMPANY_DETAILS } from '../constants';

const FooterLogo = () => (
  <div className="flex items-center mb-6 transition-transform duration-300 hover:scale-105 bg-white p-3 rounded-2xl w-fit shadow-lg shadow-white/5">
    <img 
      src={COMPANY_DETAILS.logo} 
      alt="Flow Energy Logo" 
      className="h-12 md:h-20 w-auto object-contain block" 
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
        const parent = (e.target as HTMLImageElement).parentElement;
        if (parent) {
          const fallback = document.createElement('span');
          fallback.innerText = 'FLOW ENERGY';
          fallback.className = 'font-black text-slate-900 tracking-tighter text-2xl';
          parent.appendChild(fallback);
        }
      }}
    />
  </div>
);

const Footer: React.FC = () => {
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
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-1">
            <FooterLogo />
            <p className="text-sm leading-relaxed mb-6 font-medium">
              Empowering industrial growth through reliable supply chains and quality excellence in the energy sector.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-blue-500 transition-colors cursor-pointer">Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-blue-500 transition-colors cursor-pointer">About Flow Energy</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-blue-500 transition-colors cursor-pointer">Product Portfolio</a></li>
              <li><a href="#catalog" onClick={(e) => handleLinkClick(e, '#catalog')} className="hover:text-blue-500 transition-colors cursor-pointer">View Catalog</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-blue-500 transition-colors cursor-pointer">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]">Our Solutions</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-blue-500 transition-colors cursor-pointer">Instrumentation</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-blue-500 transition-colors cursor-pointer">Valves & Fittings</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-blue-500 transition-colors cursor-pointer">Pneumatic Systems</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-blue-500 transition-colors cursor-pointer">Hydraulic Hoses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]">Abu Dhabi Office</h4>
            <p className="text-xs leading-loose font-bold mb-6">
              {COMPANY_DETAILS.address}
            </p>
            <div className="pt-6 border-t border-white/5">
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-blue-500 font-black text-sm hover:text-blue-400 transition-colors">
                {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} Flow Energy General Trading L.L.C. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
