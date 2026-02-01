
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import { Settings, CheckCircle2 } from 'lucide-react';

const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">Our Catalog</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Comprehensive Industrial Inventory</h3>
          <p className="text-slate-600">From precision instrumentation to heavy-duty fittings, we supply the building blocks of industrial infrastructure with full technical compliance.</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'All' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Products
          </button>
          {Object.values(ProductCategory).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Settings size={24} />
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {product.category}
                </span>
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h4>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-grow">
                {product.description}
              </p>
              
              {product.specs && (
                <div className="space-y-3 mb-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Technical Specs</h5>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-start text-xs text-slate-600 font-medium">
                      <CheckCircle2 size={14} className="text-blue-500 mr-2 shrink-0 mt-0.5" />
                      {spec}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
