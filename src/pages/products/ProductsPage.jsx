import React, { useState } from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters';
import SearchBar from '../../components/ui/SearchBar';
import { products } from '../../data/products';

export const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Chronos Catalog</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Smartwatch Collection</h1>
        <p className="text-sm text-zinc-400 max-w-xl">
          Products page architecture preview — Full catalog experience coming in Phase 6.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-y border-zinc-800/80">
        <div className="w-full md:w-72">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <ProductFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;
