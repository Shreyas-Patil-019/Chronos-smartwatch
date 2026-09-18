import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import usePageSEO from '../../hooks/usePageSEO';
import { getProductBySlug, products } from '../../data/products';
import ProductViewer from '../../components/three/ProductViewer';
import WatchCustomizer from '../../components/three/WatchCustomizer';
import ProductCard from '../../components/product/ProductCard';
import Button from '../../components/ui/Button';
import { formatCurrency, formatRating } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import {
  Star,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Truck,
  Check,
  ShoppingBag,
  Heart,
} from 'lucide-react';

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

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: product ? `CHRONOS — ${product.name}` : 'CHRONOS — Timepiece Details',
    description: product ? (product.shortDescription || product.description) : 'CHRONOS luxury smartwatch details and specifications.',
    image: product?.images?.[0] || '/assets/chronos-pro-main.jpg',
  });

  // Unified color finish (synchronizes case and matching strap in 3D model)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.hex || '#121214');
  const [selectedWatchFace, setSelectedWatchFace] = useState(product?.watchFaces?.[0]?.id || 'chronograph');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Sync state whenever the route/slug changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.hex || '#121214');
      setSelectedWatchFace(product.watchFaces?.[0]?.id || 'chronograph');
      setQuantity(1);
      setAddedFeedback(false);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  // Invalid product fallback state
  if (!product) {
    const featuredFallbackProducts = products.slice(0, 3);

    return (
      <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex flex-col items-center justify-center px-4 py-24 relative overflow-x-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl w-full space-y-12 relative z-10">
          {/* Main Error Box */}
          <div className="max-w-lg mx-auto bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                CATALOG QUERY
              </span>
            </div>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase text-white tracking-tight">
                TIMEPIECE NOT FOUND
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                The requested smartwatch edition (<span className="text-amber-400 font-mono">"{slug}"</span>) is not present in the active CHRONOS catalog.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/products">
                <Button
                  variant="gold"
                  size="md"
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
                >
                  <ArrowLeft className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                  <span style={{ color: '#000000', fontWeight: 800 }}>Return to Collection</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Curated Alternatives Grid */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                EXPLORE ACTIVE LINEUP
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-tight">
                AVAILABLE TIMEPIECES
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFallbackProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    const customizationPayload = {
      color: selectedColor,
      strap: 'matched-strap',
      watchFace: selectedWatchFace,
    };
    addItem(product, quantity, customizationPayload);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 2500);
  };

  // Related products from existing catalog
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  // Dynamic spec categories map
  const specList = [
    { label: 'Display Panel', value: product.specifications?.display || '1.43" Always-On LTPO OLED, 466x466 (2000 nits)' },
    { label: 'Case & Enclosure', value: product.specifications?.caseSize || '45mm Grade 5 Titanium' },
    { label: 'Battery Stamina', value: product.specifications?.battery || 'Up to 14 days standard usage' },
    { label: 'Water Resistance', value: product.specifications?.waterResistance || '10 ATM (100 Meters ISO 6425)' },
    { label: 'Biometric Sensors', value: product.specifications?.sensors || 'Single-Lead ECG, PPG SpO2, Skin Temp' },
    { label: 'Satellite & Wireless', value: product.specifications?.connectivity || 'Dual-Band GPS, Bluetooth 5.3, NFC' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Soft Studio Depth Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-20 relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </Link>
        </motion.div>

        {/* ── 1. MAIN PRODUCT AREA (HERO & 3D VIEWER + BUYING PANEL) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: 3D Interactive Smartwatch Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            {/* 3D Viewport Card */}
            <div className="relative bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden group">
              {/* Studio Light Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/5 pointer-events-none" />

              <ProductViewer
                color={selectedColor}
                fallbackImage={product.images?.[0] || '/assets/chronos-pro-main.jpg'}
                enableMouseInteraction={true}
                className="w-full h-[450px] sm:h-[540px]"
                showControls={true}
              />
            </div>

            {/* Bottom 3D Viewport Status Bar */}
            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono px-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CHRONOS 3D STUDIO • LIVE RENDER</span>
              </span>
              <span className="text-amber-400 uppercase tracking-widest">
                360° INTERACTIVE INSPECTION
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Product Information & Customizer Buying Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Badges & Category Header */}
            <div className="flex items-center gap-3">
              {product.badge && (
                <span className="px-3 py-1 bg-amber-400 text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">
                {product.category} Series
              </span>
            </div>

            {/* Title & Short Summary */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Star className="w-4 h-4 fill-current" />
                <span>{formatRating(product.rating)}</span>
              </div>
              <span className="text-zinc-500">
                ({product.reviewCount} certified customer reviews)
              </span>
            </div>

            {/* Price & Availability */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                  Configuration Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-mono font-black text-white">
                    {formatCurrency(totalPrice)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-zinc-500 line-through font-mono">
                      {formatCurrency(product.compareAtPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider rounded-md font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  In Stock ({product.stock || 25} Units)
                </span>
              </div>
            </div>

            {/* Customizer Studio Panel (Matched Case & Strap Color) */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
              <WatchCustomizer
                product={product}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                selectedWatchFace={selectedWatchFace}
                onSelectWatchFace={setSelectedWatchFace}
              />
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-base disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-bold text-white select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-base cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart Primary CTA */}
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleAddToCart}
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="flex-1 min-w-[170px] font-mono text-xs font-bold uppercase tracking-widest py-4 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-amber-500/20"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-black font-extrabold" style={{ color: '#000000' }} />
                      <span style={{ color: '#000000', fontWeight: 800 }}>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                      <span style={{ color: '#000000', fontWeight: 800 }}>Add to Bag — {formatCurrency(totalPrice)}</span>
                    </>
                  )}
                </Button>

                {/* Wishlist Button — Fixed vibrant amber heart */}
                <button
                  onClick={() => toggleWishlist(product)}
                  type="button"
                  style={{
                    backgroundColor: inWishlist ? 'rgba(24, 24, 27, 0.95)' : 'rgba(24, 24, 27, 0.8)',
                    borderColor: inWishlist ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer shrink-0 ${
                    inWishlist ? 'scale-105 shadow-lg shadow-amber-400/20' : 'hover:border-zinc-700'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart
                    className="w-5 h-5 transition-colors"
                    style={{
                      fill: inWishlist ? '#d4af37' : 'none',
                      color: inWishlist ? '#d4af37' : '#a1a1aa',
                    }}
                  />
                </button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-zinc-400 font-mono">
                <div className="flex items-center gap-2 p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>2-Year Global Warranty</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Complimentary Shipping</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 2. KEY FEATURES SECTION ───────────────────────── */}
        {product.features && product.features.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="pt-16 border-t border-zinc-900 space-y-8"
          >
            <div className="space-y-2">
              <motion.span variants={fadeInUp} custom={0} className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                ENGINEERING HIGHLIGHTS
              </motion.span>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight">
                KEY CAPABILITIES
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  custom={idx}
                  className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3 hover:border-amber-400/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">{feature}</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Individually calibrated and tested for zero deviation under demanding environmental conditions.
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── 3. TECHNICAL SPECIFICATIONS MATRIX ─────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pt-16 border-t border-zinc-900 space-y-8"
        >
          <div className="space-y-2">
            <motion.span variants={fadeInUp} custom={0} className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              DETAILED ARCHITECTURE
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight">
              TECHNICAL SPECIFICATIONS
            </motion.h2>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="divide-y divide-zinc-800/80">
              {specList.map((spec, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 items-center gap-2 hover:bg-zinc-900/30 transition-colors">
                  <div className="md:col-span-4 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {spec.label}
                  </div>
                  <div className="md:col-span-8 text-xs sm:text-sm font-mono text-zinc-300">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── 4. PRODUCT STORY & DESIGN PHILOSOPHY ───────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pt-16 border-t border-zinc-900"
        >
          <div className="p-8 sm:p-14 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black border border-zinc-800 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                CRAFTSMANSHIP & METALLURGY
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
                ENGINEERED FOR EVERY MOMENT.
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {product.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400">
                <span>0.01mm CNC Machining</span>
                <span>•</span>
                <span>Mohs 9 Sapphire Glass</span>
                <span>•</span>
                <span>Biocompatible Titanium</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 5. RELATED PRODUCTS SECTION ────────────────────── */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="pt-16 border-t border-zinc-900 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  EXPLORE THE LINEUP
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
                  RELATED MODELS
                </h2>
              </div>
              <Link
                to="/products"
                className="text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-amber-300 transition font-bold"
              >
                View Complete Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
