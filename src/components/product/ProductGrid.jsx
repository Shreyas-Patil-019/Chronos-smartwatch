import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, RotateCcw } from 'lucide-react';

export const ProductGrid = ({ products = [], onResetFilters = null }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-8 max-w-lg mx-auto">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">No Models Found</h3>
        <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto leading-relaxed">
          No CHRONOS smartwatches matched your search or category filter. Try clearing filters to view the complete collection.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 hover:border-amber-400/40 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
