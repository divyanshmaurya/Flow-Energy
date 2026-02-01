
import React from 'react';
import { Target, Eye, Award, Users, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Narrative Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs flex items-center">
                <span className="w-8 h-px bg-blue-600 mr-3"></span>
                About Flow Energy
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Engineering <span className="text-blue-600">Reliability</span> <br />
                Since Inception.
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                Flow Energy General Trading L.L.C is a premier industrial solution provider based in Abu Dhabi, UAE. Established to bridge the gap between global engineering excellence and the rigorous demands of the Middle Eastern energy sector.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We specialize in the procurement and supply of high-performance instrumentation, valves, and fluid system components. Our expertise lies in handling complex requirements for onshore and offshore oil & gas fields, where material integrity and prompt delivery are non-negotiable. 
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">ISO Standards</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Award size={16} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-2xl group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                alt="Engineering Precision" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-10">
                <p className="text-white font-bold italic text-lg leading-relaxed max-w-sm">
                  "Serving the markets onshore and offshore with prompt and quality supply."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Target size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-900/40">
                <Target size={32} />
              </div>
              <h4 className="text-3xl font-black tracking-tight">Our Mission</h4>
              <p className="text-slate-400 leading-relaxed text-lg">
                To provide cutting-edge engineering solutions and premium industrial supplies to the Oil & Gas, Energy, and Utility sectors, ensuring operational excellence for our clients through prompt service, technical precision, and uncompromised quality standards.
              </p>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-blue-600">
              <Eye size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-slate-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Eye size={32} />
              </div>
              <h4 className="text-3xl font-black tracking-tight text-slate-900">Our Vision</h4>
              <p className="text-slate-500 leading-relaxed text-lg">
                To be the leading regional partner in industrial trading, recognized for our commitment to quality, technical expertise, and reliability in the most demanding industrial environments across the Middle East.
              </p>
            </div>
          </div>
        </div>

        {/* Why Us / Strength Section */}
        <div className="text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Our Strategic Advantages</h4>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">Why Global Operators Choose Us</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-black text-slate-200 group-hover:text-blue-100">01</div>
              <h5 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Global Sourcing</h5>
              <p className="text-slate-500 text-xs leading-relaxed px-4">Direct partnerships with world-class manufacturers like Parker and Swagelok.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-black text-slate-200">02</div>
              <h5 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Exotic Materials</h5>
              <p className="text-slate-500 text-xs leading-relaxed px-4">Specialists in SS316, 904L, 825, 621, and 6MO metallurgy.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-black text-slate-200">03</div>
              <h5 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Rapid Response</h5>
              <p className="text-slate-500 text-xs leading-relaxed px-4">Swift supply chain logistics ensuring minimal downtime for critical operations.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-black text-slate-200">04</div>
              <h5 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Expert Support</h5>
              <p className="text-slate-500 text-xs leading-relaxed px-4">Technical consultation for manifold configurations and system integration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
