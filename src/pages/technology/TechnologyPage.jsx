import React, { useState } from 'react';
import { Cpu, Radio, Battery, Compass, ShieldCheck, Layers, Activity, Smartphone, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TechnologyPage = () => {
  const [selectedTech, setSelectedTech] = useState('display');

  const techModules = [
    {
      id: 'display',
      icon: Radio,
      title: 'DISPLAY TECHNOLOGY',
      subtitle: 'Retina LTPO AMOLED Screen',
      specs: [
        { label: 'PEAK BRIGHTNESS', value: '2,000 Nits Direct Sun' },
        { label: 'PIXEL DENSITY', value: '326 PPI Retina Grade' },
        { label: 'REFRESH RATE', value: '1Hz – 60Hz Adaptive' },
        { label: 'GLASS FACE', value: 'Mohs 9 Sapphire Crystal' },
      ],
      description:
        'The CHRONOS screen utilizes custom LTPO AMOLED display technology with variable refresh rate logic. It scales dynamically down to 1Hz for Always-On ambient clock faces and ramps to 60Hz instantly during touch interaction, maximizing battery efficiency.',
    },
    {
      id: 'processing',
      icon: Cpu,
      title: 'PROCESSING ARCHITECTURE',
      subtitle: 'Dual-Core Quantum Silicon Engine',
      specs: [
        { label: 'PROCESS NODE', value: '4nm Energy Efficient' },
        { label: 'COPROCESSOR', value: 'Ultra-Low Power Neural Engine' },
        { label: 'RAM / STORAGE', value: '2GB LPDDR5 / 32GB Flash' },
        { label: 'RESPONSE TIME', value: '< 5ms Input Latency' },
      ],
      description:
        'Powered by a dedicated dual-core micro-architecture. The high-performance core executes graphics rendering and sensor signal math, while the ultra-low-power neural coprocessor runs continuous background biometric algorithms without waking the main system.',
    },
    {
      id: 'sensors',
      icon: HeartPulse,
      title: 'SENSORS & BIOMETRICS',
      subtitle: 'Photoplethysmography Array',
      specs: [
        { label: 'HEART HEALTH', value: 'Single-Lead Medical ECG' },
        { label: 'BLOOD OXYGEN', value: 'Continuous SpO2 Pulse Ox' },
        { label: 'THERMAL SENSING', value: '0.01°C Skin Temperature' },
        { label: 'MOTION MATRIX', value: '6-Axis Gyro + Accelerometer' },
      ],
      description:
        'An 8-photodiode optical cluster emitting green, red, and infrared light rays into skin tissue. Photoplethysmography algorithms analyze micro-vascular pulse volume changes to calculate continuous resting heart rate, heart rate variability (HRV), and blood oxygen saturation.',
    },
    {
      id: 'battery',
      icon: Battery,
      title: 'BATTERY ARCHITECTURE',
      subtitle: 'High-Density Silicon-Anode Cell',
      specs: [
        { label: 'CELL CAPACITY', value: '540 mAh Silicon-Anode' },
        { label: 'STAMINA MODE', value: 'Up to 14 Days Standard' },
        { label: 'GPS CONTINUOUS', value: '36 Hours Active Tracking' },
        { label: 'FAST CHARGE', value: '80% Charge in 30 Mins' },
      ],
      description:
        'Utilizing silicon-anode battery chemical chemistry that achieves 20% higher energy density than legacy lithium-ion cells. Paired with a custom magnetic induction puck charger for rapid power replenishment.',
    },
    {
      id: 'connectivity',
      icon: Compass,
      title: 'CONNECTIVITY & SATELLITE',
      subtitle: 'Dual-Frequency L1+L5 GPS Engine',
      specs: [
        { label: 'SATELLITE MESH', value: 'GPS, GLONASS, Galileo, Beidou' },
        { label: 'BLUETOOTH', value: 'Bluetooth 5.3 Low Energy' },
        { label: 'CELLULAR', value: 'Global eSIM LTE Transceiver' },
        { label: 'NFC PAYMENTS', value: 'Encrypted Contactless NFC' },
      ],
      description:
        'Dual-frequency L1 and L5 GPS receiver tracks satellite signals simultaneously across dense urban skyscrapers and remote mountain canyons, delivering waypoint tracking accuracy down to 1 meter.',
    },
    {
      id: 'durability',
      icon: ShieldCheck,
      title: 'DURABILITY & METALLURGY',
      subtitle: 'Grade 5 Aerospace Titanium',
      specs: [
        { label: 'CHASSIS ALLOY', value: 'Grade 5 Titanium (Ti-6Al-4V)' },
        { label: 'WATER RATING', value: '10 ATM (100 Meters ISO 6425)' },
        { label: 'BEZEL RING', value: 'Zirconia Ceramic Inlay' },
        { label: 'OPERATING TEMP', value: '-20°C to +55°C Extreme' },
      ],
      description:
        'The outer case is CNC milled from Grade 5 titanium, offering twice the strength-to-weight ratio of stainless steel. O-ring gasket seals and acoustic membrane vents guarantee water resistance down to 100 meters.',
    },
  ];

  const currentModule = techModules.find((m) => m.id === selectedTech) || techModules[0];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-amber-400">
            <span>ENGINEERING & SPECIFICATIONS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase font-mono tracking-tight">
            HOW CHRONOS <span className="text-gradient-gold">WORKS.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            A comprehensive breakdown of the hardware metallurgy, optical sensor physics, battery chemistry, and silicon logic powering CHRONOS smartwatches.
          </p>
        </div>
      </section>

      {/* ── MODULE SELECTOR GRID ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tech Navigation Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              SELECT ENGINEERING DOMAIN
            </span>
            {techModules.map((module) => {
              const Icon = module.icon;
              const isActive = selectedTech === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedTech(module.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-zinc-900 border-amber-400 text-white shadow-xl shadow-amber-400/5'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold uppercase">{module.title}</div>
                      <div className="text-[10px] font-mono text-zinc-500">{module.subtitle}</div>
                    </div>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Deep-Dive Spec Card */}
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                  DEEP DIVE SPECIFICATION
                </span>
                <h2 className="text-2xl font-mono font-extrabold text-white uppercase">{currentModule.title}</h2>
              </div>
              <div className="text-xs font-mono text-zinc-500">{currentModule.subtitle}</div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">{currentModule.description}</p>

            {/* Spec Key-Value Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
              {currentModule.specs.map((spec) => (
                <div key={spec.label} className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{spec.label}</div>
                  <div className="text-sm font-mono text-amber-400 font-bold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA TO EXPLORE PRODUCTS ─────────────────────────── */}
      <section className="border-t border-zinc-900 py-20 text-center">
        <div className="max-w-xl mx-auto space-y-4 px-4">
          <h3 className="text-2xl font-mono font-bold text-white uppercase">SEE THE HARDWARE IN ACTION</h3>
          <p className="text-xs text-zinc-400">Discover which CHRONOS model fits your daily endurance needs.</p>
          <div className="pt-2">
            <Link to="/products">
              <button className="px-8 py-3.5 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition">
                EXPLORE COLLECTION
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
