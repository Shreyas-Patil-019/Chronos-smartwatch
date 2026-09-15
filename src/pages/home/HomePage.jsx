import React from 'react';
import { Watch, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import WatchScene from '../../components/three/WatchScene';
import Button from '../../components/ui/Button';
import FeatureCard from '../../components/ui/FeatureCard';
import ProductGrid from '../../components/product/ProductGrid';
import { products } from '../../data/products';

export const HomePage = () => {
  return (
    <div className="space-y-16 py-8 pb-20">
      {/* Hero Foundation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-amber-400">
              <Sparkles size={14} />
              <span>PHASE 1 — ARCHITECTURE FOUNDATION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              TIME. <br />
              <span className="text-gradient-gold">REIMAGINED.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Experience the future of luxury smartwatch technology with real-time 3D web graphics and precision engineering.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/products">
                <Button variant="gold" size="lg" className="flex items-center gap-2">
                  <span>Explore Collection</span>
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive 3D Showcase Canvas */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-500/10 blur-3xl rounded-full opacity-30 pointer-events-none"></div>
            <div className="glass-card rounded-3xl p-4 border border-zinc-800/80 shadow-2xl">
              <div className="text-xs font-mono text-zinc-500 text-center py-2 uppercase tracking-widest border-b border-zinc-800/60 mb-2">
                3D Smartwatch Interactive Scene
              </div>
              <WatchScene color="#121214" strap="silicone-black" autoRotate={true} className="h-[380px] sm:h-[450px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Watch}
            title="3D Customization Studio"
            description="Preview materials, strap textures, and watch faces in real-time before purchase."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Grade 5 Titanium & Sapphire"
            description="Crafted with aerospace materials designed for endurance and scratch resistance."
          />
          <FeatureCard
            icon={Zap}
            title="Quantum Sensor Tech"
            description="Real-time biometric analysis, ECG, SpO2, and dual-band emergency GPS."
          />
        </div>
      </section>

      {/* Catalog Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Smartwatches</h2>
            <p className="text-sm text-zinc-400">Phase 1 structured catalog preview</p>
          </div>
          <Link to="/products" className="text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-amber-300">
            View All →
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default HomePage;
