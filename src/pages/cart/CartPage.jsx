import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Trash2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
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

export const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, cartSubtotal, totalItemCount } = useCart();
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Your Shopping Bag',
    description: 'Review and manage your selected CHRONOS luxury smartwatch configurations and bespoke allocations.',
  });

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
                  SHOPPING BAG // {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-mono tracking-tight"
            >
              YOUR SHOPPING <span className="text-gradient-gold">BAG.</span>
            </motion.h1>
          </div>

          {cartItems.length > 0 && (
            <motion.div variants={fadeInUp} custom={2}>
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
                aria-label="Clear all items from shopping cart"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Bag</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Area: Empty State vs. 2-Column Cart Grid */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-10 sm:p-16 bg-zinc-950/80 border border-zinc-800 rounded-3xl text-center space-y-6 max-w-xl mx-auto shadow-2xl backdrop-blur-md"
          >
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <ShoppingBag size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
                YOUR BAG IS CURRENTLY EMPTY
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-sm mx-auto">
                Explore the complete line of surgical titanium and ceramic smartwatches to begin your configuration.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.key || item.product?.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Right Column: Sticky Order Summary */}
            <div className="lg:col-span-4">
              <CartSummary subtotal={cartSubtotal} totalItemCount={totalItemCount} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
