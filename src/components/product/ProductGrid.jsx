import React from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500">
        <p>No products available matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
