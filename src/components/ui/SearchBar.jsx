import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search models...' }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs font-mono placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 transition"
      />
    </div>
  );
};

export default SearchBar;
