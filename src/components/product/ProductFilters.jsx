import React from 'react';
import { CATEGORIES } from '../../utils/constants';

export const ProductFilters = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
            selectedCategory === cat.id
              ? 'bg-white text-black border-white'
              : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;
