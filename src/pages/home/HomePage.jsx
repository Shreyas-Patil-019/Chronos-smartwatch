import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, BatteryCharging, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveShowroomSection from '../../components/home/InteractiveShowroomSection';

// Framer Motion Animation Variants for Staggered Scroll Reveals
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
  hidden: { opacity: 0, scale: 0.95, y: 25 },
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
  const scrollToShowroom = () => {
    const el = document.getElementById('3d-showroom');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-hidden">
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-8"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={fadeInUp} custom={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                THE FUTURE OF TIME
              </span>
            </div>
          </motion.div>

          {/* Large Typography */}
          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] font-mono"
          >
            CHRONOS <br />
            <span className="text-gradient-gold">TIME. REIMAGINED.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed font-sans font-normal"
          >
            Technology that keeps up with you. Engineered with aerospace Grade 5 titanium, Sapphire Crystal display, and quantum biometric intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/products">
              <button className="group flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-amber-500/20">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </Link>

            <button
              onClick={scrollToShowroom}
              className="px-7 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-widest rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              EXPLORE IN 3D
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: ENGINEERED FOR YOUR EVERY SECOND ──────── */}
      <section className="relative py-24 border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <motion.span variants={fadeInUp} custom={0} className="text-xs font-mono font-bold tracking-[0.3em] text-amber-400 uppercase block">
                PHILOSOPHY & ARCHITECTURE
              </motion.span>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
                ENGINEERED FOR YOUR <br />
                <span className="text-amber-400">EVERY SECOND.</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeInUp} custom={2} className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
              Every curve, sensor, and component is crafted to deliver continuous performance, intelligent biometric insights, and timeless aesthetic elegance.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleUp}
              custom={0}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300"
            >
              <div className="p-3 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">PREMIUM DESIGN</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Aerospace Grade 5 Titanium enclosure milled with 0.01mm tolerance. Synthesized Mohs 9 Sapphire Crystal face for scratch-proof durability.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleUp}
              custom={1}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300"
            >
              <div className="p-3 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">INTELLIGENT TECH</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Custom silicon micro-architecture delivering real-time ECG, continuous SpO2 biometric analysis, and sub-meter dual-band satellite positioning.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleUp}
              custom={2}
              className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors duration-300"
            >
              <div className="p-3 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">EVERYDAY USABILITY</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Silicon-anode stamina cell delivering 14 days of power. Fast magnetic charger fills 80% capacity in 30 minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MADE TO MOVE WITH YOU ────────────────── */}
      <section className="relative py-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center space-y-3 max-w-2xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} custom={0} className="text-xs font-mono font-bold tracking-[0.3em] text-amber-400 uppercase block">
              LIFESTYLE INTEGRATION
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
              MADE TO MOVE <span className="text-amber-400">WITH YOU.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-sm text-zinc-400 font-sans leading-relaxed">
              Designed for executive productivity, high-intensity athletic endurance, and international travel.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: '01 // WORK', title: 'EXECUTIVE CONTROL', text: 'Subtle haptic notification filters, calendar scheduling, and hands-free smartphone synchronization.' },
              { id: '02 // FITNESS', title: 'ATHLETIC ENDURANCE', text: 'VO2 Max calculation, heart-rate recovery tracking, and 50+ specialized athletic workout modes.' },
              { id: '03 // TRAVEL', title: 'GLOBAL NAVIGATION', text: 'Automatic timezone adjustment, offline topological map storage, and dual L1+L5 satellite GPS.' },
              { id: '04 // EVERYDAY', title: 'EVERYDAY LUXURY', text: 'Contactless NFC payments, customizable digital dial faces, and 100m water resistance.' },
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeInUp}
                custom={idx * 0.8}
                className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">{item.id}</div>
                <h4 className="text-base font-mono text-white uppercase font-bold">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DEDICATED 3D VIEWER ──────────────────── */}
      <motion.div
        id="3d-showroom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
      >
        <InteractiveShowroomSection />
      </motion.div>

      {/* ── SECTION 5: CHRONOS PRO FLAGSHIP PRESENTATION ───── */}
      <section className="relative py-24 border-t border-zinc-900 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Specs Summary */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-6 space-y-6"
            >
              <motion.div variants={fadeInUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-amber-400">
                <span>FLAGSHIP SERIES</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
                CHRONOS <span className="text-gradient-gold">PRO</span>
              </motion.h2>
              <motion.p variants={fadeInUp} custom={2} className="text-sm text-zinc-400 leading-relaxed">
                The flagship luxury smartwatch built with aerospace materials, LTPO AMOLED Retina screen, and ECG biometric suite.
              </motion.p>
              <motion.div variants={fadeInUp} custom={3} className="text-2xl font-mono text-white font-bold">
                Starting at <span className="text-amber-400">$799</span>
              </motion.div>

              <motion.div variants={fadeInUp} custom={4} className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">DISPLAY</div>
                  <div className="text-xs font-mono text-white font-bold">1.43" LTPO OLED (2000 nits)</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">BATTERY</div>
                  <div className="text-xs font-mono text-white font-bold">Up to 14 Days Stamina</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">MATERIALS</div>
                  <div className="text-xs font-mono text-white font-bold">Grade 5 Titanium & Sapphire</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">WATER RATING</div>
                  <div className="text-xs font-mono text-white font-bold">10 ATM (100 Meters)</div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} custom={5} className="pt-4">
                <Link to="/products/chronos-pro">
                  <button className="group flex items-center gap-3 px-8 py-3.5 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition">
                    <span>VIEW PRODUCT DETAILS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Card Presentation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleUp}
              custom={1}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6 text-center shadow-2xl">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Watch className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-mono font-extrabold text-white uppercase">CHRONOS PRO TITANIUM</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Includes Fluoropolymer Sport Strap, Magnetic Fast Charger, and 2-Year Global Warranty.
                </p>
                <div className="pt-2 border-t border-zinc-800 flex justify-around text-xs font-mono text-zinc-400">
                  <span>Space Black</span>
                  <span>Titanium Silver</span>
                  <span>Rose Gold</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ───────────────────────────────── */}
      <section className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-zinc-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <motion.h2 variants={fadeInUp} custom={0} className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tight font-mono">
            YOUR TIME. <br />
            <span className="text-gradient-gold">YOUR WORLD.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} custom={1} className="text-sm sm:text-base text-zinc-400 font-sans max-w-lg mx-auto">
            Experience CHRONOS luxury smartwatch technology.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="pt-4 flex justify-center">
            <Link to="/products">
              <button className="group flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition shadow-xl">
                <span>DISCOVER CHRONOS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
