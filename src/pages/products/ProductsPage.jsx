import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters';
import SearchBar from '../../components/ui/SearchBar';
import { products } from '../../data/products';
import { Sparkles, ArrowUpDown, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

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

export const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const shouldReduceMotion = useReducedMotion();

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filter and sort product collection
  const processedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.features?.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12 relative z-10">
        {/* ── 1. COLLECTION HERO ────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-4 max-w-3xl"
        >
          <motion.div variants={fadeInUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                THE CHRONOS COLLECTION
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-mono leading-[0.95]"
          >
            TIME, <span className="text-gradient-gold">YOUR WAY.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl"
          >
            Precision engineered for every dimension of your ambition. Explore the complete lineup of surgical titanium, zirconia ceramic, and extreme-endurance smartwatches.
          </motion.p>
        </motion.div>

        {/* ── 2. CONTROLS BAR: FILTERS, SEARCH & SORT ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-4 sm:p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-3xl backdrop-blur-md space-y-4 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex-1 overflow-x-auto">
              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Search and Sort Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              {/* Search Bar */}
              <div className="w-full sm:w-64">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search models, specs..."
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-2.5 transition">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer pr-4"
                  aria-label="Sort collection by"
                >
                  <option value="featured" className="bg-zinc-900 text-white">Featured</option>
                  <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
                  <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary & Reset Trigger */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs font-mono text-zinc-500">
            <span>
              Showing <strong className="text-white">{processedProducts.length}</strong> of {products.length} models
            </span>
            {(selectedCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
              <button
                onClick={handleResetFilters}
                className="text-amber-400 hover:text-amber-300 transition text-[11px] uppercase tracking-wider underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </motion.div>

        {/* ── 3. PRODUCT GRID ───────────────────────────────── */}
        <ProductGrid
          products={processedProducts}
          onResetFilters={handleResetFilters}
        />

        {/* ── 4. BRAND SERVICE & GUARANTEE BAR ──────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="p-6 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase">2-Year Warranty</h4>
              <p className="text-[11px] text-zinc-400 font-sans">Full international repair guarantee.</p>
            </div>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase">Express Shipping</h4>
              <p className="text-[11px] text-zinc-400 font-sans">Complimentary global delivery.</p>
            </div>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase">30-Day Returns</h4>
              <p className="text-[11px] text-zinc-400 font-sans">Risk-free trial and return policy.</p>
            </div>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase">24/7 Concierge</h4>
              <p className="text-[11px] text-zinc-400 font-sans">Direct access to technical experts.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
