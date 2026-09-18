import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Activity, Sliders, Radio, Shield, Sparkles } from 'lucide-react';

const getFadeInUp = (shouldReduce) => ({
  hidden: { opacity: 0, y: shouldReduce ? 0 : 35 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduce ? 0 : 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: shouldReduce ? 0 : custom * 0.1,
    },
  }),
});

export const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState('sensors');
  const shouldReduceMotion = useReducedMotion();
  const fadeInUp = getFadeInUp(shouldReduceMotion);

  const annotations = [
    {
      id: 'engineering',
      label: 'PRECISION ENGINEERED',
      icon: Layers,
      spec: '0.01mm Tolerance Machining',
      details: 'CNC machined Grade 5 titanium chassis featuring diamond-cut chamfers and zero-gap seam sealing for surgical accuracy.',
      tag: 'AEROSPACE CHASSIS',
    },
    {
      id: 'screen',
      label: 'AMOLED RETINA DISPLAY',
      icon: Radio,
      spec: '454 x 454 px • 326 ppi',
      details: 'Always-On Retina AMOLED with custom watch faces, 2000 nits peak luminance, and dynamic ambient brightness adaptation.',
      tag: 'MOHS 9 SAPPHIRE',
    },
    {
      id: 'crown',
      label: 'TACTILE CROWN & ENCODER',
      icon: Sliders,
      spec: 'Haptic Rotary Feedback',
      details: 'Custom machined crown wheel delivering crisp physical mechanical detent feedback and smooth scroll navigation.',
      tag: 'DIGITAL HAPTICS',
    },
    {
      id: 'sensors',
      label: 'BIOMETRIC SENSOR ARRAY',
      icon: Activity,
      spec: 'Optical PPG + Single-Lead ECG',
      details: 'Multi-wavelength photoplethysmography cluster delivering continuous heart rate variability, SpO2, and skin temperature tracking.',
      tag: 'QUANTUM TELEMETRY',
    },
    {
      id: 'materials',
      label: 'PREMIUM STRAP ARCHITECTURE',
      icon: Shield,
      spec: 'Titanium Links / FKM Rubber',
      details: 'Quick-release ergonomic lug system compatible with surgical titanium link bracelets, fluoroelastomer, and Italian leather.',
      tag: 'ZERO-PLAY LUGS',
    },
  ];

  const activeModule = annotations.find((a) => a.id === activeTab) || annotations[0];

  return (
    <section id="technology" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Section Header with Scroll Reveal */}
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
                TECHNICAL DISSECTION
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono"
          >
            DESIGNED TO BE <br />
            <span className="text-gradient-gold">NOTICED.</span>
          </motion.h2>
        </div>
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed"
        >
          CHRONOS marries aerospace metallurgy with state-of-the-art silicon micro-architecture. Every component is individually calibrated for high-stress endurance.
        </motion.p>
      </motion.div>

      {/* Engineering Blueprint Viewport */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        {/* Background Grid Lines Blueprint Effect */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Left Column: Interactive Component Selector */}
        <div className="lg:col-span-5 space-y-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2 font-bold">
            SELECT ARCHITECTURE MODULE
          </span>
          {annotations.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  backgroundColor: isActive ? 'rgba(24, 24, 27, 0.95)' : 'rgba(24, 24, 27, 0.4)',
                  borderColor: isActive ? '#d4af37' : 'rgba(255, 255, 255, 0.08)',
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? '#d4af37' : '#27272a',
                      color: isActive ? '#000000' : '#a1a1aa',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono font-bold uppercase tracking-wider"
                      style={{ color: isActive ? '#ffffff' : '#a1a1aa' }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[10px] font-mono"
                      style={{ color: isActive ? '#d4af37' : '#71717a' }}
                    >
                      {item.spec}
                    </div>
                  </div>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Spec Callout Panel */}
        <div className="lg:col-span-7 relative z-10 flex flex-col justify-center space-y-6 p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                MODULE // {activeModule.tag}
              </span>
              <h3 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
                {activeModule.label}
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700">
              {activeModule.spec}
            </span>
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            {activeModule.details}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60">
            <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">MANUFACTURING</span>
              <span className="text-xs font-mono font-bold text-white">ISO 9001 Certified Cleanroom</span>
            </div>
            <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">CALIBRATION</span>
              <span className="text-xs font-mono font-bold text-amber-400">Zero-Deviation Benchmark</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechnologySection;
