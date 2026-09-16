/**
 * CHRONOS 3D Product Catalog Data
 * Structured mock product catalog architecture for smartwatches
 */

export const products = [
  {
    id: 'chronos-pro-1',
    name: 'Chronos Pro',
    slug: 'chronos-pro',
    description: 'The definitive luxury smartwatch engineered with surgical titanium, Sapphire Crystal display, and quantum-level bio-metric sensors for unmatched performance.',
    shortDescription: 'Surgical titanium smartwatch with Sapphire Crystal display.',
    price: 799,
    compareAtPrice: 899,
    rating: 4.9,
    reviewCount: 142,
    images: [
      '/assets/chronos-pro-main.jpg',
      '/assets/chronos-pro-angle.jpg',
      '/assets/chronos-pro-wrist.jpg',
    ],
    model: '/models/chronos-watch.glb',
    colors: [
      { id: 'space-black', name: 'Space Black', hex: '#121214', accentHex: '#000000' },
      { id: 'titanium-silver', name: 'Titanium Silver', hex: '#d1d5db', accentHex: '#9ca3af' },
      { id: 'rose-gold', name: 'Rose Gold', hex: '#e2a197', accentHex: '#c47d73' },
    ],
    straps: [
      { id: 'silicone-black', name: 'Sport Silicone Black', material: 'Fluoropolymer', price: 0 },
      { id: 'leather-cognac', name: 'Italian Leather Cognac', material: 'Full Grain Leather', price: 99 },
      { id: 'titanium-link', name: 'Titanium Link Bracelet', material: 'Grade 5 Titanium', price: 199 },
    ],
    watchFaces: [
      { id: 'chronograph', name: 'Tactical Chronograph', style: 'Analog' },
      { id: 'minimal-digital', name: 'OLED Minimal', style: 'Digital' },
      { id: 'orbit-astronomy', name: 'Cosmic Orbit', style: 'Animated' },
    ],
    specifications: {
      display: '1.43" Always-On LTPO OLED, 466x466 (1000 nits)',
      caseSize: '45mm Grade 5 Titanium',
      battery: 'Up to 7 days continuous / 14 days power saver',
      waterResistance: '10 ATM (100 Meters)',
      sensors: 'ECG, PPG SpO2, Temperature, Dual-Frequency GPS',
      connectivity: 'Bluetooth 5.3, Wi-Fi 6, NFC, eSIM Cellular',
    },
    features: [
      'Sapphire Crystal Glass Display',
      'Advanced ECG Heart Health Tracking',
      'Dual-Frequency Precision GPS',
      'Continuous Blood Oxygen Sensing',
      'Fast Magnetic Charging (80% in 30 mins)',
    ],
    stock: 25,
    category: 'flagship',
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'chronos-x-2',
    name: 'Chronos X',
    slug: 'chronos-x',
    description: 'Futuristic aesthetic meets stealth performance. Chronos X features a matte ceramic enclosure with custom customizable LED perimeter lighting.',
    shortDescription: 'Matte ceramic smartwatch with customizable perimeter lighting.',
    price: 999,
    compareAtPrice: 1199,
    rating: 5.0,
    reviewCount: 88,
    images: [
      '/assets/chronos-x-main.jpg',
      '/assets/chronos-x-angle.jpg',
    ],
    model: '/models/chronos-watch.glb',
    colors: [
      { id: 'stealth-matt-black', name: 'Stealth Matte Black', hex: '#0a0a0c', accentHex: '#18181b' },
      { id: 'ceramic-white', name: 'Pure Ceramic White', hex: '#f8fafc', accentHex: '#e2e8f0' },
    ],
    straps: [
      { id: 'stealth-mesh', name: 'Cyber Metal Mesh', material: 'Stainless Steel Mesh', price: 0 },
      { id: 'carbon-weave', name: 'Carbon Fiber Weave', material: 'Carbon Composite', price: 149 },
    ],
    watchFaces: [
      { id: 'cyber-matrix', name: 'Cyber Matrix 2077', style: 'Digital' },
      { id: 'stealth-analog', name: 'Stealth Stealth', style: 'Analog' },
    ],
    specifications: {
      display: '1.5" Super Retina AMOLED, 500x500 (1500 nits)',
      caseSize: '46mm Zirconia Ceramic',
      battery: 'Up to 5 days intense usage',
      waterResistance: '5 ATM (50 Meters)',
      sensors: 'Multi-channel Optical Heart, VO2 Max, Stress Tracking',
      connectivity: 'Bluetooth 5.3, Wi-Fi 6, NFC',
    },
    features: [
      'Zirconia Ceramic Scratch-Resistant Case',
      'Customizable LED Aura Halo Ring',
      'Tactile Digital Crown with Haptic Feedback',
      'AI Health & Performance Coach',
    ],
    stock: 12,
    category: 'luxury',
    featured: true,
    badge: 'Limited Edition',
  },
  {
    id: 'chronos-ultra-3',
    name: 'Chronos Ultra',
    slug: 'chronos-ultra',
    description: 'Built for extreme environments, deep dive exploration, and high-altitude alpine expeditions with rugged aerospace grade alloy and emergency satellite beacon.',
    shortDescription: 'Extreme exploration smartwatch with 100m water resistance.',
    price: 1199,
    compareAtPrice: 1299,
    rating: 4.8,
    reviewCount: 64,
    images: [
      '/assets/chronos-ultra-main.jpg',
      '/assets/chronos-ultra-side.jpg',
    ],
    model: '/models/chronos-watch.glb',
    colors: [
      { id: 'desert-tan', name: 'Tactical Desert Tan', hex: '#d2b48c', accentHex: '#b89768' },
      { id: 'stealth-grey', name: 'Alpine Grey', hex: '#64748b', accentHex: '#475569' },
    ],
    straps: [
      { id: 'oceanic-loop', name: 'Oceanic Rubber Loop', material: 'Fluoroelastomer', price: 0 },
      { id: 'alpine-nylon', name: 'Alpine Reinforced Nylon', material: 'High-Tenacity Nylon', price: 79 },
    ],
    watchFaces: [
      { id: 'tactical-compass', name: 'Topo Altitude & Compass', style: 'Utility' },
      { id: 'dive-depth', name: 'ISO Dive Log', style: 'Analog' },
    ],
    specifications: {
      display: '1.9" Sapphire Crystal Ultra Display (2000 nits)',
      caseSize: '49mm Aerospace Titanium Case',
      battery: 'Up to 14 days standard / 60 hours multi-GPS mode',
      waterResistance: '100m Dive Certified (EN13319)',
      sensors: 'Depth Gauge, Water Temp Sensor, Altimeter, Barometer',
      connectivity: 'Dual-Band GPS, SOS Satellite Transceiver, NFC',
    },
    features: [
      'EN13319 Certified Oceanic Dive Computer',
      'Dual-Band Satellite Emergency SOS Beacon',
      'Rugged Guarded Action Crown & Buttons',
      'Night-Vision Red Screen Mode',
    ],
    stock: 18,
    category: 'ultra',
    featured: true,
    badge: 'Extreme Series',
  },
  {
    id: 'chronos-sport-4',
    name: 'Chronos Sport',
    slug: 'chronos-sport',
    description: 'Ultra-lightweight aluminum body tailored for runners, swimmers, and fitness enthusiasts. Advanced metrics and seamless audio playback on the move.',
    shortDescription: 'Ultra-lightweight aluminum body tailored for athletes.',
    price: 499,
    compareAtPrice: 549,
    rating: 4.7,
    reviewCount: 210,
    images: [
      '/assets/chronos-sport-main.jpg',
      '/assets/chronos-sport-active.jpg',
    ],
    model: '/models/chronos-watch.glb',
    colors: [
      { id: 'electric-blue', name: 'Electric Cyan', hex: '#06b6d4', accentHex: '#0891b2' },
      { id: 'blaze-orange', name: 'Blaze Orange', hex: '#f97316', accentHex: '#ea580c' },
      { id: 'midnight-black', name: 'Midnight Black', hex: '#18181b', accentHex: '#09090b' },
    ],
    straps: [
      { id: 'breathable-sport', name: 'Ventilated Sport Band', material: 'Silicone', price: 0 },
      { id: 'reflective-nylon', name: 'Reflective Night Loop', material: 'Nylon', price: 49 },
    ],
    watchFaces: [
      { id: 'fitness-rings', name: 'Triple Activity Rings', style: 'Digital' },
      { id: 'pace-tracker', name: 'Live Pace & HR Dial', style: 'Utility' },
    ],
    specifications: {
      display: '1.4" OLED Curved Glass Display (1000 nits)',
      caseSize: '41mm Recycled Aircraft Aluminum',
      battery: 'Up to 3 days continuous active mode',
      waterResistance: '50m Swimproof',
      sensors: 'Heart Rate, SpO2, Sleep Stages, GPS',
      connectivity: 'Bluetooth 5.3, Offline Music Storage',
    },
    features: [
      'Ultra Lightweight (Only 32 grams)',
      'Real-Time Heart Rate & Strain Recovery Tracking',
      '50 Meter Swimproof Rating',
      'Offline Music Playback via Bluetooth Headphones',
    ],
    stock: 50,
    category: 'sport',
    featured: false,
    badge: 'Popular',
  },
];

/**
 * Get product by slug
 * @param {string} slug 
 * @returns {object|null}
 */
export const getProductBySlug = (slug) => {
  return products.find((product) => product.slug === slug) || null;
};

/**
 * Get featured products
 * @returns {Array}
 */
export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};
