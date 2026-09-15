import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductViewer from '../three/ProductViewer';
import Button from '../ui/Button';

export const HeroSection = () => {
  const scrollToFeatures = () => {
    const el = document.getElementById('built-for-more');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100vh] lg:min-h-[110vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: Cinematic Copy & CTAs (5 cols on lg) */}
        <div className="lg:col-span-6 space-y-8 z-20">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-zinc-900/90 border border-amber-500/30 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              THE FUTURE OF TIME
            </span>
          </div>

          {/* Main Large Typography */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] font-mono">
              TIME. <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                REIMAGINED.
              </span>
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-lg leading-relaxed font-sans font-normal">
            Technology that keeps up with you. Experience precision aerospace titanium, quantum sensor biometrics, and real-time interactive 3D web engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/products">
              <Button
                variant="gold"
                size="lg"
                className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-amber-500/20"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>

            <button
              onClick={scrollToFeatures}
              className="px-7 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-widest rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-md"
            >
              DISCOVER CHRONOS
            </button>
          </div>

          {/* Quick Technical Specs Micro-Bar */}
          <div className="pt-8 border-t border-zinc-900 grid grid-cols-3 gap-6">
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
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Virtual Showroom Product Presentation (6 cols on lg) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Subtle Ambient Light Glow behind product */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-blue-500/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none" />

          {/* 3D Interactive Product Container */}
          <div className="relative w-full max-w-lg aspect-square glass-card rounded-3xl p-2 border border-zinc-800/80 shadow-2xl overflow-hidden group">
            {/* Top Interactive Indicator Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-zinc-950/80 border border-zinc-800 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                INTERACTIVE 3D • MOVE CURSOR
              </span>
            </div>

            {/* 3D Product Viewer */}
            <ProductViewer
              color="#121214"
              strap="silicone-black"
              autoRotate={false}
              enableMouseInteraction={true}
              className="w-full h-full min-h-[420px] sm:min-h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToFeatures}>
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </div>
    </section>
  );
};

export default HeroSection;
