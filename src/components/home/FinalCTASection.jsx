import React from 'react';
import { ArrowRight, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export const FinalCTASection = () => {
  return (
    <section className="relative py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900 text-center">
      <div className="relative max-w-4xl mx-auto p-10 sm:p-20 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-inner">
            <Watch className="w-6 h-6" />
          </div>

          <h2 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tight font-mono leading-tight">
            YOUR TIME. <br />
            <span className="text-gradient-gold">YOUR WORLD.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-lg mx-auto font-sans">
            Discover the CHRONOS collection. Step into the future of luxury smartwatch engineering today.
          </p>

          <div className="pt-4 flex justify-center">
            <Link to="/products">
              <Button
                variant="gold"
                size="lg"
                className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-amber-500/20"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
