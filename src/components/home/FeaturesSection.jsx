import React from 'react';
import { Cpu, Compass, BatteryCharging, Droplet, ShieldCheck } from 'lucide-react';
import ProductViewer from '../three/ProductViewer';

export const FeaturesSection = () => {
  const capabilities = [
    {
      id: 'amoled',
      icon: Cpu,
      title: 'AMOLED DISPLAY',
      subtitle: '2,000 Nits Brightness',
      desc: 'Edge-to-edge sapphire crystal screen engineered for uncompromised readability in full direct sunlight.',
      position: 'top-left',
    },
    {
      id: 'gps',
      icon: Compass,
      title: 'DUAL-BAND GPS',
      subtitle: 'Precision Waypoint Navigation',
      desc: 'L1 & L5 multi-constellation emergency positioning for off-grid backcountry adventures.',
      position: 'top-right',
    },
    {
      id: 'battery',
      icon: BatteryCharging,
      title: '14-DAY BATTERY',
      subtitle: 'Silicon-Anode Cell Tech',
      desc: 'Intelligent power management delivering 14 days standard usage or 36 hours continuous GPS tracking.',
      position: 'bottom-left',
    },
    {
      id: 'water',
      icon: Droplet,
      title: '100M WATER RESISTANT',
      subtitle: 'ISO 6425 Marine Standard',
      desc: 'Sealed titanium enclosure built for high-speed watersports and deep scuba diving.',
      position: 'bottom-right',
    },
  ];

  return (
    <section id="built-for-more" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            ENGINEERING CAPABILITIES
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
          BUILT FOR <span className="text-amber-400">MORE.</span>
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed font-sans">
          Performance, health, navigation and connectivity designed around your day.
        </p>
      </div>

      {/* Storytelling Visual Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Annotations (2 items) */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          {capabilities.slice(0, 2).map((cap) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={cap.id}
                className="group relative p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white tracking-widest uppercase">
                      {cap.title}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400 tracking-wider">
                      {cap.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{cap.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Center Interactive Product Anchor */}
        <div className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
          <div className="relative w-full aspect-square glass-card rounded-full p-6 border border-zinc-800/60 shadow-2xl flex items-center justify-center">
            {/* Pulsing Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-amber-500/10 animate-ping opacity-25 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-zinc-800/40 pointer-events-none" />
            
            <ProductViewer
              color="#18181b"
              strap="titanium-gray"
              autoRotate={true}
              enableMouseInteraction={true}
              className="w-full h-[360px]"
            />
          </div>
        </div>

        {/* Right Annotations (2 items) */}
        <div className="lg:col-span-4 space-y-8 order-3">
          {capabilities.slice(2, 4).map((cap) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={cap.id}
                className="group relative p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white tracking-widest uppercase">
                      {cap.title}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400 tracking-wider">
                      {cap.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
