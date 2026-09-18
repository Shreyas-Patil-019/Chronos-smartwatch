import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const TermsPage = () => {
  usePageSEO({
    title: 'CHRONOS — Terms of Service & Membership',
    description: 'Read the terms of service governing CHRONOS timepiece allocation, warranty coverage, and digital concierge access.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">Terms of Service</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          All bespoke CHRONOS timepieces include complimentary international concierge coverage and a 2-year mechanical warranty.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
