import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Compass, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.1,
    },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.12,
    },
  }),
};

const productIcons = {
  'chronos-pro-1': ShieldCheck,
  'chronos-x-2': Zap,
  'chronos-ultra-3': Compass,
  'chronos-sport-4': Activity,
};

export const CollectionPreviewSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="collection" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div className="space-y-3 max-w-2xl">
          <motion.div variants={fadeInUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                ACT 05 // THE CHRONOS COLLECTION
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono"
          >
            ONE ECOSYSTEM. <br />
            <span className="text-gradient-gold">MULTIPLE WAYS TO MOVE.</span>
          </motion.h2>
        </div>
        <motion.div variants={fadeInUp} custom={2} className="space-y-3">
          <p className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
            From surgical titanium executive flagships to extreme expedition dive computers, discover the watch tailored for your ambition.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-amber-300 transition font-bold"
          >
            <span>View Full Lineup ({products.length} Models)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => {
          const Icon = productIcons[product.id] || ShieldCheck;
          return (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={shouldReduceMotion ? {} : cardVariant}
              custom={idx}
              className="group relative p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl hover:border-amber-400/50 transition-all duration-500 backdrop-blur-md flex flex-col justify-between shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  {product.badge && (
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase px-2.5 py-1 bg-zinc-900 border border-amber-400/30 rounded-full font-bold">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Name & Short Description */}
                <h3 className="text-lg font-mono font-black text-white uppercase tracking-wider mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4 min-h-[36px]">
                  {product.shortDescription || product.description}
                </p>

                {/* Key Spec Chips */}
                <div className="space-y-1.5 py-3 border-y border-zinc-900 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Case</span>
                    <span>{product.specifications?.caseSize?.split(' ')[1] || 'Titanium'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Water</span>
                    <span>{product.specifications?.waterResistance?.split(' ')[0] || '10 ATM'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Battery</span>
                    <span>{product.specifications?.battery?.split('/')[0] || 'Up to 14 Days'}</span>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-6 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Starting at</span>
                  <span className="text-base font-mono font-bold text-amber-400">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <Link
                  to={`/products/${product.slug}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-amber-400 text-zinc-300 hover:text-black font-mono text-xs uppercase tracking-wider rounded-xl transition-all duration-300 group-hover:bg-amber-400 group-hover:text-black font-semibold"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CollectionPreviewSection;
