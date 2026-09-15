import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Cpu, Compass, Droplet, BatteryCharging } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShowroomOverlay = ({ activeScene, scrollToNextScene }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12">
      {/* SCENE 01 — ARRIVAL */}
      <div
        className={`absolute inset-0 flex items-center transition-all duration-700 pointer-events-auto max-w-7xl mx-auto px-6 sm:px-12 ${
          activeScene === 0
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900/90 border border-amber-400/30 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              THE FUTURE OF TIME
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter font-mono leading-[0.95]">
            CHRONOS <br />
            <span className="text-gradient-gold">TIME. REIMAGINED.</span>
          </h1>
          <p className="text-base text-zinc-400 font-sans leading-relaxed">
            Technology that keeps up with you. Experience aerospace titanium metallurgy, quantum sensors, and dynamic 3D web graphics.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/products">
              <button className="flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition shadow-xl">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button
              onClick={scrollToNextScene}
              className="px-7 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-widest rounded-xl border border-zinc-800 transition"
            >
              DISCOVER CHRONOS
            </button>
          </div>
        </div>
      </div>

      {/* SCENE 02 — THE SILHOUETTE */}
      <div
        className={`absolute inset-0 flex items-center justify-start transition-all duration-700 max-w-7xl mx-auto px-6 sm:px-12 ${
          activeScene === 1
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-lg space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase block font-bold">
            SCENE 02 // SILHOUETTE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-mono tracking-tight leading-tight">
            DESIGNED TO BE <br />
            <span className="text-gradient-gold">NOTICED.</span>
          </h2>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            Aerospace Grade 5 Titanium chassis engineered with zero-gap precision machining and diamond-cut chamfers.
          </p>
        </div>
      </div>

      {/* SCENE 03 — THE DISPLAY */}
      <div
        className={`absolute inset-0 flex items-center justify-end transition-all duration-700 max-w-7xl mx-auto px-6 sm:px-12 ${
          activeScene === 2
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-md space-y-6 text-right">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase block font-bold">
            SCENE 03 // SCREEN ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
            BRILLIANCE AT A <span className="text-amber-400">GLANCE.</span>
          </h2>
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-right backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">AMOLED DISPLAY</div>
              <div className="text-[10px] font-mono text-amber-400">2,000 Nits Direct Sunlight Visibility</div>
            </div>
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-right backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">HIGH CONTRAST</div>
              <div className="text-[10px] font-mono text-zinc-400">Mohs 9 Synthesized Sapphire Glass</div>
            </div>
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-right backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">ALWAYS-ON EXPERIENCE</div>
              <div className="text-[10px] font-mono text-zinc-400">326 PPI Retina Calibration</div>
            </div>
          </div>
        </div>
      </div>

      {/* SCENE 04 — PRECISION */}
      <div
        className={`absolute inset-0 flex items-center justify-start transition-all duration-700 max-w-7xl mx-auto px-6 sm:px-12 ${
          activeScene === 3
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-md space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase block font-bold">
            SCENE 04 // PRECISION ENGINEERING
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
            ENGINEERED FOR <br />
            <span className="text-gradient-gold">EVERY SECOND.</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">PRECISION</div>
              <div className="text-[10px] font-mono text-zinc-400">0.01mm Tolerance</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">PERFORMANCE</div>
              <div className="text-[10px] font-mono text-amber-400">Haptic Crown</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">SENSORS</div>
              <div className="text-[10px] font-mono text-zinc-400">ECG & SpO2 Array</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">GPS</div>
              <div className="text-[10px] font-mono text-amber-400">Dual-Band L1+L5</div>
            </div>
          </div>
        </div>
      </div>

      {/* SCENE 05 — BUILT FOR LIFE */}
      <div
        className={`absolute inset-0 flex items-center justify-end transition-all duration-700 max-w-7xl mx-auto px-6 sm:px-12 ${
          activeScene === 4
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-md space-y-6 text-right">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase block font-bold">
            SCENE 05 // ENDURANCE CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
            READY FOR WHATEVER <br />
            <span className="text-amber-400">COMES NEXT.</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 pt-2 text-left">
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">WATER RESISTANCE</div>
              <div className="text-[10px] font-mono text-amber-400">100M ISO Standard</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">LONG BATTERY</div>
              <div className="text-[10px] font-mono text-zinc-400">14 Days Stamina</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">DURABILITY</div>
              <div className="text-[10px] font-mono text-zinc-400">Titanium Shell</div>
            </div>
            <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-white uppercase">FITNESS SUITE</div>
              <div className="text-[10px] font-mono text-amber-400">Real-Time Biometrics</div>
            </div>
          </div>
        </div>
      </div>

      {/* SCENE 06 — THE PRODUCT */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 pointer-events-auto max-w-4xl mx-auto px-6 ${
          activeScene === 5
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase font-bold">
            SCENE 06 // FLAGSHIP SHOWCASE
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter font-mono">
            CHRONOS <span className="text-gradient-gold">PRO</span>
          </h2>
          <p className="text-base text-zinc-400 font-sans max-w-md mx-auto">
            The pinnacle of luxury smartwatch engineering. Crafted for those who dictate their time.
          </p>
          <div className="pt-4 flex justify-center">
            <Link to="/products">
              <button className="flex items-center gap-3 px-9 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition shadow-xl">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SCENE 07 — FINAL MOMENT */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 pointer-events-auto max-w-4xl mx-auto px-6 ${
          activeScene === 6
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <h2 className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tight font-mono leading-none">
            YOUR TIME. <br />
            <span className="text-gradient-gold">YOUR WORLD.</span>
          </h2>
          <p className="text-lg font-mono text-zinc-400 tracking-widest uppercase">
            CHRONOS
          </p>
          <div className="pt-2 flex justify-center">
            <Link to="/products">
              <button className="px-10 py-4 bg-zinc-900 border border-amber-400/50 hover:border-amber-400 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition shadow-2xl">
                DISCOVER CHRONOS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomOverlay;
