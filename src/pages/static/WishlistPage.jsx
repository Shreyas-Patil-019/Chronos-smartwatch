import React from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import ProductGrid from '../../components/product/ProductGrid';

export const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Saved Wishlist</h1>
        <p className="text-sm text-zinc-400 mt-1">Wishlist Page — Full functionality coming in Phase 9</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center text-zinc-500">
          <p>No items in your wishlist yet.</p>
        </div>
      ) : (
        <ProductGrid products={wishlistItems} />
      )}
    </div>
  );
};

export default WishlistPage;
