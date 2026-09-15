import React, { useState } from 'react';
import ProductViewer from '../three/ProductViewer';
import { Sparkles, Eye } from 'lucide-react';

export const ShowcaseSection = () => {
  const [selectedFinish, setSelectedFinish] = useState({
    color: '#09090b',
    name: 'Space Black Titanium',
    strap: 'silicone-black',
  });

  const finishes = [
    { color: '#09090b', name: 'Space Black', strap: 'silicone-black' },
    { color: '#52525b', name: 'Raw Titanium', strap: 'titanium-gray' },
    { color: '#78350f', name: 'Gold Bronze', strap: 'leather-brown' },
  ];

  return (
    <section className="relative py-32 bg-black z-10 overflow-hidden border-t border-zinc-900">
      {/* Background Lighting Radial Bloom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900/80 border border-amber-400/30 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-amber-400 uppercase">
            SHOWCASE MOMENT
          </span>
        </div>

        {/* Minimal Typography */}
        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter font-mono leading-none mb-4">
          MEET <span className="text-gradient-gold">CHRONOS.</span>
        </h2>
        <p className="text-xl sm:text-2xl font-mono text-zinc-400 tracking-widest uppercase max-w-2xl mx-auto mb-12">
          BUILT AROUND YOUR TIME.
        </p>

        {/* Large Viewport Smartwatch Presentation */}
        <div className="relative max-w-3xl mx-auto h-[480px] sm:h-[580px] glass-card rounded-3xl p-4 border border-zinc-800/80 shadow-2xl flex items-center justify-center">
          <ProductViewer
            color={selectedFinish.color}
            strap={selectedFinish.strap}
            autoRotate={true}
            enableMouseInteraction={true}
            scale={1.15}
            className="w-full h-full"
          />

          {/* Bottom Interactive Finish Swatch Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-6 py-3 bg-zinc-950/90 border border-zinc-800 rounded-full backdrop-blur-xl shadow-2xl">
            <Eye className="w-4 h-4 text-amber-400 mr-1" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
              FINISH:
            </span>
            {finishes.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelectedFinish(f)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  selectedFinish.name === f.name
                    ? 'border-amber-400 scale-125 shadow-lg'
                    : 'border-zinc-700 hover:scale-110'
                }`}
                style={{ backgroundColor: f.color }}
                title={f.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
