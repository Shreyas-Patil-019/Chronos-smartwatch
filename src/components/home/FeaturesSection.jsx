import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Compass, BatteryCharging, Droplet, ShieldCheck } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.1,
    },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.12,
    },
  }),
};

export const FeaturesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const capabilities = [
    {
      id: 'amoled',
      icon: Cpu,
      title: 'AMOLED DISPLAY',
      subtitle: '2,000 Nits Brightness',
      desc: 'Edge-to-edge sapphire crystal screen engineered for uncompromised readability in full direct sunlight.',
      tag: 'OPTICAL RETINA',
    },
    {
      id: 'gps',
      icon: Compass,
      title: 'DUAL-BAND GPS',
      subtitle: 'Precision Waypoint Navigation',
      desc: 'L1 & L5 multi-constellation emergency positioning for off-grid backcountry adventures.',
      tag: 'SATELLITE POSITIONING',
    },
    {
      id: 'battery',
      icon: BatteryCharging,
      title: '14-DAY BATTERY',
      subtitle: 'Silicon-Anode Cell Tech',
      desc: 'Intelligent power management delivering 14 days standard usage or 36 hours continuous GPS tracking.',
      tag: 'FAST CHARGE 80%',
    },
    {
      id: 'water',
      icon: Droplet,
      title: '100M WATER RESISTANT',
      subtitle: 'ISO 6425 Marine Standard',
      desc: 'Sealed titanium enclosure built for high-speed watersports and deep scuba diving.',
      tag: '10 ATM CERTIFIED',
    },
  ];

  return (
    <section id="built-for-more" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-20"
      >
        <motion.div variants={fadeInUp} custom={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              ENGINEERING CAPABILITIES
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          custom={1}
          className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono"
        >
          BUILT FOR <span className="text-amber-400">MORE.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-base text-zinc-400 leading-relaxed font-sans max-w-xl mx-auto"
        >
          Performance, health, navigation, and connectivity engineered around your active day.
        </motion.p>
      </motion.div>

      {/* Progressive Grid of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilities.map((cap, idx) => {
          const IconComponent = cap.icon;
          return (
            <motion.div
              key={cap.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={shouldReduceMotion ? {} : cardVariant}
              custom={idx}
              className="group relative p-8 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl hover:border-amber-400/50 transition-all duration-500 backdrop-blur-md flex flex-col justify-between shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              {/* Subtle Card Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="text-base font-mono font-bold text-white tracking-wider uppercase mb-1">
                  {cap.title}
                </h3>
                <div className="text-xs font-mono text-amber-400 font-semibold mb-3">
                  {cap.subtitle}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {cap.desc}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-600 group-hover:text-amber-400 transition-colors">
                <span>MODULE // 0{idx + 1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
