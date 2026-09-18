import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const AboutPage = () => {
  usePageSEO({
    title: 'CHRONOS — Craftsmanship & Heritage',
    description: 'Learn about the artisanal horology, micro-machining, and aerospace materials behind CHRONOS timepieces.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">About CHRONOS</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          CHRONOS was founded with a singular conviction: to merge centuries of Swiss horological mastery with next-generation quantum computing and biocompatible aerospace titanium.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
