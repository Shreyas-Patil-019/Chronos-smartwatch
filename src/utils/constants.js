// Application & Brand Constants for CHRONOS 3D

export const BRAND = {
  NAME: 'CHRONOS',
  TAGLINE: 'TIME. REIMAGINED.',
  DESCRIPTION: 'Precision engineering meets futuristic design in our luxury 3D interactive smartwatch line.',
  FOUNDED_YEAR: 2026,
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Collection', path: '/products' },
  { name: 'Technology', path: '/technology' },
  { name: 'About', path: '/about' },
];

export const FOOTER_LINKS = {
  shop: [
    { name: 'Chronos Pro', path: '/products/chronos-pro' },
    { name: 'Chronos X', path: '/products/chronos-x' },
    { name: 'Chronos Ultra', path: '/products/chronos-ultra' },
    { name: 'Chronos Sport', path: '/products/chronos-sport' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Technology', path: '/technology' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ],
  support: [
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Returns & Exchanges', path: '/returns' },
    { name: 'Order Status', path: '/account' },
    { name: 'FAQ', path: '/contact' },
  ],
};

export const CATEGORIES = [
  { id: 'all', name: 'All Models' },
  { id: 'flagship', name: 'Flagship Series' },
  { id: 'luxury', name: 'Luxury Edition' },
  { id: 'sport', name: 'Sport & Active' },
  { id: 'ultra', name: 'Ultra Extreme' },
];

export const DEFAULT_CUSTOMIZATION = {
  color: 'space-black',
  strap: 'silicone-black',
  watchFace: 'chronograph',
};
