import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, Compass } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import Button from '../../components/ui/Button';

export const NotFoundPage = () => {
  usePageSEO({
    title: 'CHRONOS — Page Not Found (404)',
    description: 'The requested page or timepiece configuration does not exist in the CHRONOS catalog.',
  });
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-24 bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-lg w-full bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
            CHRONOS NAVIGATION // ERROR 404
          </span>
        </div>

        {/* 404 Large Typography */}
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 via-zinc-800 to-zinc-900 border border-amber-400/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto font-mono text-2xl font-black shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
            PAGE NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            The page or timepiece model you requested does not exist, has been retired, or moved to another catalog section.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/products" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="md"
              style={{ color: '#000000', backgroundColor: '#d4af37' }}
              className="w-full font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
            >
              <Compass className="w-3.5 h-3.5 text-black" style={{ color: '#000000' }} />
              <span style={{ color: '#000000', fontWeight: 800 }}>Explore Collection</span>
            </Button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
