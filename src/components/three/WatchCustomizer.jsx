import React from 'react';
import { Check, Sparkles, Palette } from 'lucide-react';

/**
 * WatchCustomizer — Premium 3D Smartwatch Customization Control Panel
 * Case and strap colors are unified: choosing a case color automatically synchronizes
 * the strap to the exact same color, maintaining uniform premium strap material.
 */
export const WatchCustomizer = ({
  product,
  selectedColor,
  onSelectColor,
  selectedWatchFace,
  onSelectWatchFace,
}) => {
  const colors = product?.colors || [
    { id: 'space-black', name: 'Space Black', hex: '#121214' },
    { id: 'titanium-silver', name: 'Titanium Silver', hex: '#d1d5db' },
    { id: 'rose-gold', name: 'Rose Gold', hex: '#e2a197' },
  ];

  const watchFaces = product?.watchFaces || [
    { id: 'chronograph', name: 'Tactical Chronograph', style: 'Analog' },
    { id: 'minimal-digital', name: 'OLED Minimal', style: 'Digital' },
    { id: 'orbit-astronomy', name: 'Cosmic Orbit', style: 'Animated' },
  ];

  const activeColorObj = colors.find((c) => c.hex === selectedColor || c.id === selectedColor) || colors[0];
  const activeFaceObj = watchFaces.find((f) => f.id === selectedWatchFace) || watchFaces[0];

  return (
    <div className="space-y-6">
      {/* ── 1. UNIFIED CASE & MATCHING STRAP FINISH ──────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Case & Matching Strap Finish</span>
          </label>
          <span className="text-xs font-mono text-amber-400 font-semibold">
            {activeColorObj?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {colors.map((c) => {
            const isSelected = selectedColor === c.hex || selectedColor === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectColor(c.hex)}
                className={`p-3 rounded-xl text-left border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400 text-white shadow-md shadow-amber-400/10'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
                title={`${c.name} (Matched Case & Strap)`}
              >
                <span
                  className={`w-6 h-6 rounded-full border-2 shrink-0 transition-transform ${
                    isSelected ? 'border-amber-400 scale-110 shadow-sm' : 'border-zinc-700'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono font-bold text-white block truncate">
                    {c.name}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                    Matched Band
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. DIAL WATCH FACE INTERFACE ─────────────────────── */}
      {watchFaces.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              2. Dial Interface
            </label>
            <span className="text-xs font-mono text-zinc-500">
              {activeFaceObj?.style}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {watchFaces.map((f) => {
              const isSelected = selectedWatchFace === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSelectWatchFace(f.id)}
                  className={`p-3 rounded-xl text-center border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-400 text-white shadow-md shadow-amber-400/10'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase tracking-tight text-white mb-0.5 truncate">
                    {f.name}
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block">
                    {f.style}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchCustomizer;
