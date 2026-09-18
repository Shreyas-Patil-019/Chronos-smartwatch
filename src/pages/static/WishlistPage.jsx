import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Star, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatCurrency, formatRating } from '../../utils/formatters';
import Button from '../../components/ui/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.1,
    },
  }),
};

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState({});
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Saved Wishlist',
    description: 'View and manage your saved portfolio of CHRONOS luxury smartwatch editions and custom configurations.',
  });

  const handleAddToCartFromWishlist = (product) => {
    if (!product) return;
    const defaultColor = product.colors?.[0]?.hex || '#121214';
    addItem(product, 1, { color: defaultColor, strap: 'matched-strap' });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Soft Studio Depth Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Exploring Collection</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800/80 pb-8"
        >
          <div className="space-y-3">
            <motion.div variants={fadeInUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                  SAVED TIMEPIECES // {wishlistCount} {wishlistCount === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-mono tracking-tight"
            >
              SAVED <span className="text-gradient-gold">WISHLIST.</span>
            </motion.h1>
          </div>

          {wishlistItems.length > 0 && (
            <motion.div variants={fadeInUp} custom={2}>
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
                aria-label="Clear all items from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Area: Empty State vs. Responsive Wishlist Grid */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-10 sm:p-16 bg-zinc-950/80 border border-zinc-800 rounded-3xl text-center space-y-6 max-w-xl mx-auto shadow-2xl backdrop-blur-md"
          >
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <Heart size={32} className="fill-amber-400/20 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
                YOUR WISHLIST IS CURRENTLY EMPTY
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-sm mx-auto">
                Save your favorite CHRONOS smartwatches here to compare specifications and configurations later.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/products">
                <Button
                  variant="gold"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 cursor-pointer shadow-xl hover:shadow-amber-500/20"
                >
                  Explore Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((product) => {
              if (!product || !product.id) return null;
              const mainImage = product.images?.[0] || '/assets/chronos-pro-main.jpg';
              const isAdded = addedIds[product.id];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-zinc-950/90 border border-zinc-800/80 hover:border-amber-400/60 rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 shadow-xl backdrop-blur-md overflow-hidden"
                >
                  <div>
                    {/* Visual Container */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden flex items-center justify-center p-4">
                      {product.badge && (
                        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-950/90 border border-amber-400/40 text-amber-400 rounded-full shadow-md backdrop-blur-md">
                          {product.badge}
                        </span>
                      )}

                      {/* Remove from Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition cursor-pointer"
                        title="Remove from wishlist"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <Link to={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={mainImage}
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/chronos-pro-main.jpg';
                          }}
                          className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    {/* Product Information */}
                    <div className="pt-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
                          {product.category} Series
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{formatRating(product.rating)}</span>
                        </div>
                      </div>

                      <Link to={`/products/${product.slug}`} className="block">
                        <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                        {product.shortDescription || product.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">Price</span>
                      <span className="text-lg font-mono font-black text-white">{formatCurrency(product.price)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCartFromWishlist(product)}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800'
                        }`}
                        title={`Add ${product.name} to bag`}
                        aria-label={`Add ${product.name} to shopping bag`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/products/${product.slug}`}
                        className="p-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl transition shadow-md"
                        title={`View ${product.name} details`}
                        aria-label={`View ${product.name} details`}
                      >
                        <ArrowRight className="w-4 h-4 text-black" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
