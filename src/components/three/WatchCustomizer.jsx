import React from 'react';
import { useCustomizer } from '../../hooks/useCustomizer';

/**
 * 3D Smartwatch Customizer Control Panel Architecture
 */
export const WatchCustomizer = ({ product }) => {
  const { customization, setColor, setStrap, setWatchFace } = useCustomizer();

  const colors = product?.colors || [
    { id: 'space-black', name: 'Space Black', hex: '#121214' },
    { id: 'titanium-silver', name: 'Titanium Silver', hex: '#d1d5db' },
    { id: 'rose-gold', name: 'Rose Gold', hex: '#e2a197' },
  ];

  const straps = product?.straps || [
    { id: 'silicone-black', name: 'Sport Silicone Black' },
    { id: 'leather-cognac', name: 'Italian Leather Cognac' },
    { id: 'titanium-link', name: 'Titanium Link Bracelet' },
  ];

  const watchFaces = product?.watchFaces || [
    { id: 'chronograph', name: 'Tactical Chronograph' },
    { id: 'minimal-digital', name: 'OLED Minimal' },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <h3 className="text-lg font-bold text-white tracking-tight">Customization Studio</h3>

      {/* Case Color Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Case Finish</label>
        <div className="flex items-center gap-3">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.hex)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                customization.color === c.hex ? 'border-white scale-110 shadow-lg' : 'border-zinc-700 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Strap Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Strap Variant</label>
        <div className="space-y-2">
          {straps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStrap(s.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium border transition ${
                customization.strap === s.id
                  ? 'bg-zinc-800 border-white text-white'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Watch Face Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Dial Interface</label>
        <div className="grid grid-cols-2 gap-2">
          {watchFaces.map((f) => (
            <button
              key={f.id}
              onClick={() => setWatchFace(f.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition ${
                customization.watchFace === f.id
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchCustomizer;
