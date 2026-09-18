import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const ReturnsPage = () => {
  usePageSEO({
    title: 'CHRONOS — 30-Day Guarantee & Returns',
    description: 'Learn about the CHRONOS 30-day trial period, return conditions, and complimentary courier pickup.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">Return Guarantee & Warranty</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          We offer a 30-day satisfaction guarantee on all non-custom engraved CHRONOS timepieces with complimentary secure return shipping.
        </p>
      </div>
    </div>
  );
};

export default ReturnsPage;
