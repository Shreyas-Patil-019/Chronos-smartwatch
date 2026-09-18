import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const ShippingPage = () => {
  usePageSEO({
    title: 'CHRONOS — Global Delivery & White-Glove Courier',
    description: 'Information regarding CHRONOS insured international transit, biometric handoff courier delivery, and customs handling.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">Global Delivery & Logistics</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          Every CHRONOS timepiece is transported in temperature-controlled, shock-isolated luxury flight cases with continuous telemetry tracking.
        </p>
      </div>
    </div>
  );
};

export default ShippingPage;
