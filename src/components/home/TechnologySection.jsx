import React, { useState } from 'react';
import { Layers, Activity, Sliders, Radio, Shield } from 'lucide-react';
import ProductViewer from '../three/ProductViewer';

export const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState('sensors');

  const annotations = [
    {
      id: 'engineering',
      label: 'PRECISION ENGINEERED',
      icon: Layers,
      spec: '0.01mm Tolerance Machining',
      details: 'CNC machined Grade 5 titanium chassis featuring diamond-cut chamfers and zero-gap seam sealing.',
    },
    {
      id: 'screen',
      label: 'AMOLED DISPLAY',
      icon: Radio,
      spec: '454 x 454 px • 326 ppi',
      details: 'Always-On Retina AMOLED with custom watch faces and dynamic ambient brightness adaptation.',
    },
    {
      id: 'crown',
      label: 'TACTILE CROWN',
      icon: Sliders,
      spec: 'Haptic Rotary Encoder',
      details: 'Custom machined crown wheel delivering crisp physical mechanical detent feedback.',
    },
    {
      id: 'sensors',
      label: 'ADVANCED SENSORS',
      icon: Activity,
      spec: 'Optical Array + ECG + SpO2',
      details: 'Photoplethysmography sensor cluster with continuous biometric monitoring and temperature tracking.',
    },
    {
      id: 'materials',
      label: 'PREMIUM MATERIALS',
      icon: Shield,
      spec: 'Sapphire Crystal + FKM Rubber',
      details: 'Synthesized Mohs 9 sapphire face with fluoroelastomer quick-release strap mechanism.',
    },
  ];

  return (
    <section id="technology" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-amber-400 uppercase">
            TECHNICAL DISSECTION
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
            DESIGNED TO BE <br />
            <span className="text-gradient-gold">NOTICED.</span>
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
          CHRONOS marries aerospace metallurgy with state-of-the-art silicon logic. Every component is individually calibrated for high-stress endurance.
        </p>
      </div>

      {/* Engineering Blueprint Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background Grid Lines Blueprint Effect */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Left Column: Interactive Component Selector */}
        <div className="lg:col-span-5 space-y-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
            SELECT ARCHITECTURE MODULE
          </span>
          {annotations.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'bg-zinc-900 border-amber-400/80 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-[10px] font-mono text-zinc-500">{item.spec}</div>
                  </div>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic 3D Viewer & Spec Callout Panel */}
        <div className="lg:col-span-7 relative z-10 flex flex-col items-center">
          <div className="w-full h-[400px] relative flex items-center justify-center">
            <ProductViewer
              color={activeTab === 'engineering' ? '#27272a' : '#121214'}
              strap={activeTab === 'materials' ? 'leather-brown' : 'silicone-black'}
              autoRotate={false}
              enableMouseInteraction={true}
              className="w-full h-full"
            />
          </div>

          {/* Active Blueprint Spec Box */}
          <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 mt-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                {annotations.find((a) => a.id === activeTab)?.label}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {annotations.find((a) => a.id === activeTab)?.spec}
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {annotations.find((a) => a.id === activeTab)?.details}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
