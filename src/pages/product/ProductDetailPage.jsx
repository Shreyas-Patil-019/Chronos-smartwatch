import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../../data/products';
import WatchCustomizer from '../../components/three/WatchCustomizer';
import ProductViewer from '../../components/three/ProductViewer';
import Button from '../../components/ui/Button';
import { formatCurrency, formatRating } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useCustomizer } from '../../hooks/useCustomizer';
import { Star, ArrowLeft, ShieldCheck, Cpu, BatteryCharging, Radio, Compass, HeartPulse, Sparkles } from 'lucide-react';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug) || getProductBySlug('chronos-pro');
  const { addItem } = useCart();
  const { customization } = useCustomizer();
  const [activeTab, setActiveTab] = useState('specs');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/products"><Button variant="outline">Back to Products</Button></Link>
      </div>
    );
  }

  const specCategories = [
    {
      title: 'DISPLAY',
      icon: Radio,
      details: product.specifications?.display || '1.43" Always-On LTPO OLED, 466x466 (2000 nits)',
      sub: 'Mohs 9 Sapphire Crystal, 326 ppi Retina resolution',
    },
    {
      title: 'CASE & DESIGN',
      icon: ShieldCheck,
      details: product.specifications?.caseSize || '45mm Grade 5 Titanium',
      sub: 'CNC machined zero-gap enclosure, quick-release strap lug system',
    },
    {
      title: 'BATTERY & POWER',
      icon: BatteryCharging,
      details: product.specifications?.battery || 'Up to 14 days continuous usage',
      sub: 'Silicon-Anode high density cell, 80% fast charge in 30 mins',
    },
    {
      title: 'BIOMETRICS & HEALTH',
      icon: HeartPulse,
      details: product.specifications?.sensors || 'Single-lead ECG, PPG SpO2, Temperature sensor',
      sub: 'Continuous heart rate variability (HRV) and deep sleep staging',
    },
    {
      title: 'SATELLITE & GPS',
      icon: Compass,
      details: 'Dual-Frequency L1+L5 Multi-Constellation GPS',
      sub: 'Off-grid waypoint tracking and emergency satellite SOS transceiver',
    },
    {
      title: 'DURABILITY RATING',
      icon: Cpu,
      details: product.specifications?.waterResistance || '10 ATM (100 Meters ISO 6425)',
      sub: 'Scuba dive certified acoustic membrane speaker vent seals',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition">
        <ArrowLeft size={16} />
        <span>Back to Collection</span>
      </Link>

      {/* Main Top Product Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Interactive Product Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 shadow-2xl">
            <ProductViewer
              color={customization.color}
              strap={customization.strap}
              enableMouseInteraction={true}
              className="h-[460px] sm:h-[520px]"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono px-2">
            <span>CHRONOS CONFIGURATOR STUDIO</span>
            <span className="text-amber-400">REAL-TIME 3D</span>
          </div>
        </div>

        {/* Right Customizer & Buying Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2 font-mono">
              <Star className="w-4 h-4 fill-current" />
              <span>{formatRating(product.rating)}</span>
              <span className="text-zinc-500">({product.reviewCount} customer reviews)</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight font-mono uppercase">{product.name}</h1>
            <p className="text-3xl font-extrabold text-amber-400 font-mono mt-2">{formatCurrency(product.price)}</p>
            <p className="text-sm text-zinc-300 mt-4 leading-relaxed font-sans">{product.description}</p>
          </div>

          {/* Customizer Studio Controls */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
            <WatchCustomizer product={product} />
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full font-mono text-xs font-bold uppercase tracking-widest py-4"
            onClick={() => addItem(product, 1, customization)}
          >
            Add Custom {product.name} to Cart — {formatCurrency(product.price)}
          </Button>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>2-Year Global Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Free Express Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Product Technical Breakdown */}
      <div className="border-t border-zinc-900 pt-12 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            TECHNICAL SPECIFICATION SHEET
          </span>
          <h2 className="text-3xl font-black text-white uppercase font-mono tracking-tight">
            ENGINEERING & METRICS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">{cat.title}</h3>
                </div>
                <div className="text-sm font-mono text-amber-400 font-semibold">{cat.details}</div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{cat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
