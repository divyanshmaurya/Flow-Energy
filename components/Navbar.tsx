
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

interface NavbarProps {
  isScrolled: boolean;
}

const Logo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className={`flex items-center group cursor-pointer transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-xl ${
    !isScrolled ? 'bg-white shadow-xl ring-1 ring-slate-200' : ''
  }`}>
    <img 
      src={COMPANY_DETAILS.logo} 
      alt="Flow Energy Logo" 
      className="h-10 md:h-12 lg:h-16 w-auto object-contain block"
      onError={(e) => {
        // Fallback to text if the image fails to load
        (e.target as HTMLImageElement).style.display = 'none';
        const parent = (e.target as HTMLImageElement).parentElement;
        if (parent) {
          const fallback = document.createElement('span');
          fallback.innerText = 'FLOW ENERGY';
          fallback.className = 'font-black text-blue-600 tracking-tighter text-xl';
          parent.appendChild(fallback);
        }
      }}
    />
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Catalog', href: '#catalog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setIsOpen(false);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-white shadow-xl py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>
            <Logo isScrolled={isScrolled} />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled || isOpen ? 'text-slate-900' : 'text-white'}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute inset-x-0 top-[64px] bg-white shadow-2xl animate-in fade-in h-screen z-50 overflow-y-auto">
          <div className="px-8 pt-12 pb-24 flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-20 border-t border-slate-100 space-y-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Headquarters</p>
              <p className="text-slate-600 font-medium leading-relaxed">
                {COMPANY_DETAILS.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
