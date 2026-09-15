import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { formatCurrency, formatRating } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import WatchScene from '../three/WatchScene';

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300">
      {/* 3D Interactive Preview Header */}
      <div className="relative w-full h-56 bg-gradient-to-b from-zinc-900 to-black p-4 flex items-center justify-center">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-wider bg-white text-black rounded-full">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition ${
            inWishlist
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* 3D Watch Preview Canvas */}
        <WatchScene
          color={product.colors?.[0]?.hex || '#121214'}
          strap={product.straps?.[0]?.id || 'silicone-black'}
          autoRotate={true}
          className="w-full h-full"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="uppercase tracking-widest font-mono text-[10px] text-zinc-500">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{formatRating(product.rating)}</span>
              <span className="text-zinc-600">({product.reviewCount})</span>
            </div>
          </div>

          <Link to={`/products/${product.slug}`} className="block group-hover:text-amber-300 transition">
            <h3 className="text-base font-bold text-white tracking-tight">{product.name}</h3>
          </Link>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
          <div>
            <span className="text-lg font-extrabold text-white font-mono">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="ml-2 text-xs text-zinc-500 line-through font-mono">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product, 1)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white text-black hover:bg-zinc-200 rounded-xl text-xs font-semibold transition active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
