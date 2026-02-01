
import React from 'react';
import { ShieldCheck, BookOpen, FileCheck } from 'lucide-react';

const CatalogSection: React.FC = () => {
  const PDF_ID = '1Q4_E_RgBUfS16y-ytUR2NqLmk5Wbt1VJ';
  const PREVIEW_URL = `https://drive.google.com/file/d/${PDF_ID}/preview`;

  return (
    <section id="catalog" className="py-24 bg-slate-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Technical Resources</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Engineering</span> Catalog
            </h3>
          </div>
          
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Browse our full range of instrumentation, valves, and fittings. Explore our comprehensive guide for detailed technical specifications directly below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-left hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Technical Portfolio</h4>
              <ul className="space-y-4 mb-8">
                {['Manifold Valves & Gauges', 'Compression Fittings', 'Industrial Hoses', 'Safety Consumables'].map((item) => (
                  <li key={item} className="flex items-center text-sm font-bold text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck size={16} className="text-green-600" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Digital Access</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latest Edition</span>
              </div>
            </div>
          </div>

          {/* Right Column: PDF Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-2xl h-[600px] md:h-[800px] overflow-hidden group relative">
              <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10 flex items-center justify-center">
                <p className="text-slate-400 font-bold text-sm">Loading Catalog Preview...</p>
              </div>
              <iframe
                src={PREVIEW_URL}
                className="w-full h-full rounded-[1.8rem]"
                allow="autoplay"
                title="Flow Energy Product Catalog"
              ></iframe>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Official Document</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
