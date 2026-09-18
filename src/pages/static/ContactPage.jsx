import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const ContactPage = () => {
  usePageSEO({
    title: 'CHRONOS — Concierge & Client Support',
    description: 'Get in touch with the CHRONOS 24/7 client concierge, horology specialists, and private timepiece consultants.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">Client Concierge</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          Our private horological concierges are available 24 hours a day, 7 days a week to assist with bespoke timepiece allocations, custom engravings, and warranty services.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
