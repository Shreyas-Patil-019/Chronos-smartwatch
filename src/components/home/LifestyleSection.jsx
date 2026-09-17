import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Globe, Coffee, Briefcase, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export const LifestyleSection = () => {
  const [activeMode, setActiveMode] = useState('FITNESS');
  const shouldReduceMotion = useReducedMotion();

  const modes = [
    {
      id: 'FITNESS',
      icon: Activity,
      title: 'ATHLETIC & ENDURANCE',
      headline: 'Biometric telemetry precision for peak human performance.',
      metric: 'VO2 Max • Recovery Score • Heart Rate Zones • Strain Recovery',
      color: 'from-emerald-500/15 via-zinc-950 to-zinc-900',
      description: 'Analyze aerobic thresholds in real time, track post-workout muscular recovery curves, and compute continuous heart rate variability across high-intensity training regimes.',
      capabilities: ['Dynamic Training Load Analytics', 'Sub-Second Cardiac Telemetry', 'Altitude Acclimatization Tracking'],
    },
    {
      id: 'TRAVEL',
      icon: Globe,
      title: 'GLOBAL EXPLORATION',
      headline: 'Dual-time zone sync with satellite waypoint navigation.',
      metric: 'Dual GPS • Barometer • Altimeter • SOS Satellite Transceiver',
      color: 'from-blue-500/15 via-zinc-950 to-zinc-900',
      description: 'Automatic international timezone coordination upon landing, offline topological terrain contour maps, and dual L1+L5 multi-constellation satellite emergency positioning.',
      capabilities: ['Multi-Constellation Satellite GPS', 'Offline Waypoint Topo Maps', 'Barometric Storm Alarm'],
    },
    {
      id: 'EVERYDAY',
      icon: Coffee,
      title: 'EVERYDAY LUXURY',
      headline: 'Timeless aesthetic crafted for evening sophistication.',
      metric: 'Sapphire Crystal • Contactless NFC • 100m Water Proof',
      color: 'from-purple-500/15 via-zinc-950 to-zinc-900',
      description: 'High-contrast sapphire crystal OLED dials, seamless contactless tap-to-pay convenience, and 100-meter marine waterproof confidence tailored for formal occasions.',
      capabilities: ['Always-On Retina OLED Dials', 'Encrypted Contactless Payments', 'Grade 5 Titanium Ergonomics'],
    },
    {
      id: 'WORK',
      icon: Briefcase,
      title: 'EXECUTIVE CONTROL',
      headline: 'Seamless connectivity without digital overwhelm.',
      metric: 'Calendar • Haptic Reminders • Priority Notification Filters',
      color: 'from-amber-500/15 via-zinc-950 to-zinc-900',
      description: 'Filter critical executive communications with subtle haptic micro-vibrations, synchronize calendar schedules across timezones, and stay effortlessly focused on your agenda.',
      capabilities: ['Subtle Tactile Meeting Alerts', 'Multi-Calendar Agenda Sync', 'Smart Priority Filters'],
    },
  ];

  const currentMode = modes.find((m) => m.id === activeMode) || modes[0];

  return (
    <section id="lifestyle" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-16"
      >
        <motion.div variants={fadeInUp} custom={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              ACT 03 // LIFESTYLE INTEGRATION
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          custom={1}
          className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono"
        >
          MADE TO MOVE <span className="text-amber-400">WITH YOU.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-base text-zinc-400 font-sans leading-relaxed max-w-xl mx-auto"
        >
          One ecosystem engineered to adapt effortlessly across fitness endurance, global travel, and everyday luxury.
        </motion.p>
      </motion.div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              style={{
                backgroundColor: isActive ? '#d4af37' : 'rgba(24, 24, 27, 0.8)',
                borderColor: isActive ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                color: isActive ? '#000000' : '#d4d4d8',
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer select-none ${
                isActive
                  ? 'font-bold shadow-lg shadow-amber-400/20 scale-105'
                  : 'hover:border-zinc-500 hover:text-white'
              }`}
            >
              <Icon
                className="w-4 h-4"
                style={{ color: isActive ? '#000000' : '#a1a1aa' }}
              />
              <span
                className="text-xs font-mono font-bold uppercase"
                style={{ color: isActive ? '#000000' : '#e4e4e7', fontWeight: isActive ? 800 : 600 }}
              >
                {mode.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* Adaptive Mode Display Card — Synchronous Permanent Render with Smooth CSS Crossfade */}
      <div className="relative min-h-[380px] sm:min-h-[340px] rounded-3xl border border-zinc-800 bg-zinc-950/90 overflow-hidden shadow-2xl">
        <div
          key={currentMode.id}
          className={`p-8 sm:p-12 bg-gradient-to-br ${currentMode.color} h-full flex flex-col justify-between transition-all duration-300 ease-out`}
        >
          <div className="max-w-3xl space-y-6 relative z-10">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950/90 border border-zinc-800 rounded-lg text-xs font-mono text-amber-400 font-semibold">
              <span>MODE // {currentMode.title}</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-mono leading-tight">
              {currentMode.headline}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {currentMode.description}
            </p>

            {/* Capabilities Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentMode.capabilities.map((cap, i) => (
                <div key={i} className="px-3.5 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Telemetry Bar */}
            <div className="p-4 bg-zinc-950/90 border border-zinc-800/80 rounded-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                ACTIVE TELEMETRY SUITE
              </span>
              <span className="text-xs sm:text-sm font-mono text-amber-400 font-semibold">
                {currentMode.metric}
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-amber-400 transition cursor-pointer"
              >
                <span>Explore CHRONOS Ecosystem</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
