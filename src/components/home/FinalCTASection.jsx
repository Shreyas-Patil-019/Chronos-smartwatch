import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.12,
    },
  }),
};

export const FinalCTASection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative max-w-4xl mx-auto p-10 sm:p-20 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-inner"
          >
            <Watch className="w-7 h-7" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tight font-mono leading-tight"
          >
            YOUR TIME. <br />
            <span className="text-gradient-gold">YOUR WORLD.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-base sm:text-lg text-zinc-400 max-w-lg mx-auto font-sans leading-relaxed"
          >
            Experience CHRONOS luxury smartwatch technology. Step into the future of precision metallurgy, biometric intelligence, and timeless elegance today.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="pt-4 flex justify-center"
          >
            <Link to="/products">
              <Button
                variant="gold"
                size="lg"
                className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
