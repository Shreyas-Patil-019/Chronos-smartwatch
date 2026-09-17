import React from 'react';
import { CATEGORIES } from '../../utils/constants';

export const ProductFilters = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            style={{
              backgroundColor: isActive ? '#d4af37' : 'rgba(24, 24, 27, 0.8)',
              borderColor: isActive ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
              color: isActive ? '#000000' : '#d4d4d8',
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all duration-300 cursor-pointer select-none ${
              isActive ? 'font-bold shadow-lg shadow-amber-400/20 scale-105' : 'hover:text-white hover:border-zinc-500'
            }`}
          >
            <span
              style={{
                color: isActive ? '#000000' : 'inherit',
                fontWeight: isActive ? 800 : 500,
              }}
            >
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProductFilters;
