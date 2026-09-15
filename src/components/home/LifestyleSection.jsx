import React, { useState } from 'react';
import { Briefcase, Activity, Globe, Coffee, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LifestyleSection = () => {
  const [activeMode, setActiveMode] = useState('WORK');

  const modes = [
    {
      id: 'WORK',
      icon: Briefcase,
      title: 'EXECUTIVE & WORK',
      headline: 'Seamless connectivity without digital overwhelm.',
      metric: 'Calendar • Haptic Reminders • Subtle Alerts',
      color: 'from-amber-500/20 to-zinc-900',
    },
    {
      id: 'FITNESS',
      icon: Activity,
      title: 'ATHLETIC & ENDURANCE',
      headline: 'Biometric telemetry precision for peak performance.',
      metric: 'VO2 Max • Recovery Score • Heart Rate Zones',
      color: 'from-emerald-500/20 to-zinc-900',
    },
    {
      id: 'TRAVEL',
      icon: Globe,
      title: 'GLOBAL EXPLORATION',
      headline: 'Dual-time zone sync with satellite waypoint navigation.',
      metric: 'Dual GPS • Barometer • Altimeter',
      color: 'from-blue-500/20 to-zinc-900',
    },
    {
      id: 'EVERYDAY',
      icon: Coffee,
      title: 'EVERYDAY LUXURY',
      headline: 'Timeless aesthetic crafted for evening sophistication.',
      metric: 'Custom Watch Faces • Contactless NFC • 100m Water Proof',
      color: 'from-purple-500/20 to-zinc-900',
    },
  ];

  const currentMode = modes.find((m) => m.id === activeMode) || modes[0];

  return (
    <section className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold tracking-[0.3em] text-amber-400 uppercase">
          ADAPTIVE VERSATILITY
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
          YOUR DAY. <span className="text-amber-400">YOUR RHYTHM.</span>
        </h2>
        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          Engineered to adapt effortlessly across every dimension of your lifestyle.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
                isActive
                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.id}</span>
            </button>
          );
        })}
      </div>

      {/* Display Card */}
      <div className={`relative p-8 sm:p-14 rounded-3xl border border-zinc-800 bg-gradient-to-br ${currentMode.color} shadow-2xl transition-all duration-500 overflow-hidden`}>
        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-mono text-amber-400">
            <span>MODE // {currentMode.title}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-mono leading-tight">
            {currentMode.headline}
          </h3>

          <div className="p-4 bg-zinc-950/80 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              ACTIVE TELEMETRY SUITE
            </span>
            <span className="text-sm font-mono text-amber-400 font-semibold">
              {currentMode.metric}
            </span>
          </div>

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-amber-400 transition"
            >
              <span>Explore Mode Accessories</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
