import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Heart, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatCurrency, formatRating } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mainImage = product.images?.[0] || '/assets/chronos-pro-main.jpg';
  const hoverImage = product.images?.[1];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, { color: product.colors?.[0]?.hex || '#121214', strap: 'matched-strap' });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-zinc-950/90 border border-zinc-800/80 hover:border-amber-400/60 rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 backdrop-blur-md overflow-hidden"
    >
      {/* Background Soft Studio Depth Ambient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Card Header: Product Imagery Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden flex items-center justify-center p-4">
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-950/90 border border-amber-400/40 text-amber-400 rounded-full shadow-md backdrop-blur-md">
              {product.badge}
            </span>
          )}

          {/* Wishlist Toggle Button — Fixed with permanent amber filled heart */}
          <button
            onClick={handleWishlistClick}
            type="button"
            style={{
              backgroundColor: inWishlist ? 'rgba(24, 24, 27, 0.95)' : 'rgba(9, 9, 11, 0.8)',
              borderColor: inWishlist ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
            }}
            className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer ${
              inWishlist
                ? 'scale-110 shadow-lg shadow-amber-400/20'
                : 'hover:border-zinc-500'
            }`}
            aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart
              className="w-3.5 h-3.5 transition-colors"
              style={{
                fill: inWishlist ? '#d4af37' : 'none',
                color: inWishlist ? '#d4af37' : '#a1a1aa',
              }}
            />
          </button>

          {/* Primary Product Image with Secondary Crossfade */}
          <Link to={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center relative">
            {!imgError ? (
              <>
                <img
                  src={mainImage}
                  alt={product.name}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700 ease-out transform group-hover:scale-105 ${
                    hoverImage ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {hoverImage && (
                  <img
                    src={hoverImage}
                    alt={`${product.name} alternate angle`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 transform group-hover:scale-105"
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-500 space-y-1">
                <ShieldCheck className="w-8 h-8 text-amber-400/60" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{product.name}</span>
              </div>
            )}
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="pt-5 space-y-3">
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{formatRating(product.rating)}</span>
              <span className="text-zinc-600 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Narrative Description */}
          <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2 min-h-[36px]">
            {product.shortDescription || product.description}
          </p>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-medium">Finishes:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <span
                    key={c.id}
                    className="w-3.5 h-3.5 rounded-full border border-zinc-700 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} (Matched Case & Strap)`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Specs Micro-Summary */}
          {product.specifications && (
            <div className="py-2.5 px-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
              <div>
                <span className="text-zinc-600 block text-[9px] uppercase">Water Rating</span>
                <span className="text-zinc-300 font-semibold">{product.specifications.waterResistance?.split(' ')[0] || '10 ATM'}</span>
              </div>
              <div>
                <span className="text-zinc-600 block text-[9px] uppercase">Stamina</span>
                <span className="text-zinc-300 font-semibold">{product.specifications.battery?.split('/')[0] || '14 Days'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing & Action Controls */}
      <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">Starting at</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-mono font-black text-white">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-zinc-600 line-through font-mono">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            type="button"
            className={`p-2.5 border rounded-xl transition-all cursor-pointer ${
              added
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-600'
            }`}
            title={`Quick add ${product.name} to bag`}
            aria-label={`Quick add ${product.name} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <Link
            to={`/products/${product.slug}`}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 transform group-hover:shadow-lg group-hover:shadow-amber-500/20 cursor-pointer"
          >
            <span className="text-black font-bold">Explore</span>
            <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
