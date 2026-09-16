import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export const HeroSection = ({ onExplore3D }) => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll-driven parallax translations
  const titleY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-20%']);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-12%']);
  const ctaY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-8%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], shouldReduceMotion ? [1, 1] : [1, 0.15]);
  const glowY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '25%']);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 z-10 overflow-hidden"
    >
      {/* Background Cinematic Radial Glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-b from-amber-500/10 via-blue-500/5 to-transparent blur-3xl rounded-full pointer-events-none"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-4xl space-y-8"
      >
        {/* Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-zinc-900/90 border border-amber-400/30 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              THE FUTURE OF TIME
            </span>
          </div>
        </motion.div>

        {/* Cinematic Headline with Parallax */}
        <motion.div style={{ y: titleY }} className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] font-mono"
          >
            CHRONOS <br />
            <span className="text-gradient-gold">TIME. REIMAGINED.</span>
          </motion.h1>
        </motion.div>

        {/* Supporting Narrative */}
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed font-sans font-normal"
          >
            Technology that keeps up with you. Engineered with aerospace Grade 5 titanium, Sapphire Crystal display, and quantum biometric intelligence.
          </motion.p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Link to="/products">
            <Button
              variant="gold"
              size="lg"
              className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </Link>

          <button
            onClick={() => scrollToSection('3d-showroom')}
            className="px-7 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-widest rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-md cursor-pointer"
          >
            EXPLORE IN 3D
          </button>
        </motion.div>

        {/* Quick Specs Micro-Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="pt-8 border-t border-zinc-900/80 grid grid-cols-3 gap-6 max-w-lg"
        >
          <div>
            <div className="text-xl font-mono font-extrabold text-white">GRADE 5</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">TITANIUM CHASSIS</div>
          </div>
          <div>
            <div className="text-xl font-mono font-extrabold text-amber-400">100M</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">WATER RESISTANCE</div>
          </div>
          <div>
            <div className="text-xl font-mono font-extrabold text-white">14 DAYS</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">BATTERY STAMINA</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-500 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => scrollToSection('philosophy')}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
