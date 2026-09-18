import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Cpu, BatteryCharging, Sparkles } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import HeroSection from '../../components/home/HeroSection';
import LifestyleSection from '../../components/home/LifestyleSection';
import TechnologySection from '../../components/home/TechnologySection';
import CollectionPreviewSection from '../../components/home/CollectionPreviewSection';
import InteractiveShowroomSection from '../../components/home/InteractiveShowroomSection';
import FinalCTASection from '../../components/home/FinalCTASection';

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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.96, y: 25 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.12,
    },
  }),
};

export const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — TIME. REIMAGINED.',
    description: 'Explore the CHRONOS luxury smartwatch collection. Aerospace-grade titanium, surgical ceramic, and sapphire crystal precision engineering.',
    image: '/assets/chronos-pro-main.jpg',
  });

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* ── ACT 01: THE INTRODUCTION ────────────────────────── */}
      <HeroSection />

      {/* ── ACT 02: THE PHILOSOPHY ──────────────────────────── */}
      <section id="philosophy" className="relative py-28 border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    ACT 02 // BRAND PHILOSOPHY
                  </span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
                ENGINEERED FOR YOUR <br />
                <span className="text-amber-400">EVERY SECOND.</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeInUp} custom={2} className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
              Every curve, sensor, and component across the CHRONOS ecosystem is crafted to deliver continuous performance, intelligent biometric insights, and timeless aesthetic elegance.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={shouldReduceMotion ? {} : scaleUp}
              custom={0}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300 backdrop-blur-sm shadow-xl"
            >
              <div className="p-3.5 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">AEROSPACE METALLURGY</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Grade 5 Titanium and Zirconia Ceramic enclosures precision-milled with 0.01mm tolerance. Synthesized Mohs 9 Sapphire Crystal for absolute scratch-proof durability.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={shouldReduceMotion ? {} : scaleUp}
              custom={1}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300 backdrop-blur-sm shadow-xl"
            >
              <div className="p-3.5 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">INTELLIGENT BIO-SENSORS</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Custom silicon micro-architecture delivering real-time single-lead ECG, continuous SpO2 biometric analytics, and sub-meter dual-band satellite positioning.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={shouldReduceMotion ? {} : scaleUp}
              custom={2}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300 backdrop-blur-sm shadow-xl"
            >
              <div className="p-3.5 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">UNCOMPROMISED STAMINA</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Silicon-anode high-density battery cells delivering up to 14 days of power. Fast magnetic induction charger fills 80% battery capacity in just 30 minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ACT 03: DESIGNED FOR LIFE (LIFESTYLE MODES) ────── */}
      <LifestyleSection />

      {/* ── ACT 04: TECHNOLOGY (TECHNICAL DISSECTION) ──────── */}
      <TechnologySection />

      {/* ── ACT 05: THE COLLECTION (ECOSYSTEM PREVIEW) ──────── */}
      <CollectionPreviewSection />

      {/* ── ACT 06: EXPLORE IN 3D (3D STUDIO TEASER) ───────── */}
      <InteractiveShowroomSection />

      {/* ── ACT 07: FINAL BRAND STATEMENT ──────────────────── */}
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
