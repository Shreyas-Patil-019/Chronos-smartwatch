# CHRONOS — 3D Smartwatch E-Commerce Experience

> **"TIME. REIMAGINED."**  
> A luxury 3D interactive smartwatch e-commerce web application engineered with modern React, Three.js, React Three Fiber, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## 1. Project Overview

**CHRONOS** is a luxury 3D smartwatch e-commerce web application that bridges interactive computer graphics and modern e-commerce web engineering. Built with React 19, Three.js, React Three Fiber, and Tailwind CSS, the platform delivers an engaging digital flagship store where users can interactively explore luxury timepieces in real-time 3D, customize watch finishes and dial interfaces, browse a structured product catalog, and progress through a complete frontend checkout and order tracking workflow.

The project highlights clean component architecture, client-side state persistence, custom WebGL shader adaptation, multi-tier error boundaries with procedural 3D fallbacks, and responsive, accessible UI design.

---

## 2. Key Features

### 3D Interactive Visualization
- **Real-Time 3D Product Inspection**: High-fidelity 3D smartwatch rendering running in WebGL via Three.js and React Three Fiber.
- **360° Mouse & Touch Manipulation**: Free orbital rotation and pitch examination with cursor drag or touch swipe.
- **Scoped Zoom & Distance Clamping**: Clamped camera distance boundaries to prevent clipping or losing model focus.
- **Auto-Rotation & Reset Controls**: Interactive floating viewport controls to toggle continuous turntable rotation or smoothly lerp camera orientation back to the default presentation angle.
- **Scroll Isolation**: Scoped viewport pointer events (`touch-none`) ensuring the 3D model can be freely rotated without interfering with natural document page scrolling.

### Product Customization
- **Real-Time Material Synchronizer**: Instant 3D material updates across watch case, chamfered bezel, and matching ergonomic strap.
- **Dynamic PBR Response**: Physical material calculations for metalness, roughness, and reflection intensity calibrated per finish so dark finishes (e.g., Space Black) preserve metallic sheen without washing out or collapsing into a flat void.
- **Custom Screen Shader Adaptation**: Custom GLSL fragment shader injection via Three.js `onBeforeCompile` boosting watch face text, numbers, and UI indicators to bright, crisp white (`vec3(1.0, 1.0, 1.0)`) against deep AMOLED black on dark models.
- **Dial Face Interface Switcher**: Real-time switching between dial display styles (Tactical Chronograph, Minimal Digital, Cosmic Orbit).

### E-Commerce Workflows
- **Curated Catalog & Category Filtering**: Browse models across categorized series (Flagship, Luxury, Sport, Ultra) with filter toggles and active item counts.
- **Detailed Product Specifications**: Technical spec sheets covering display resolution, case titanium grade, battery stamina, water resistance ratings (ISO), and biometric sensors.
- **Persistent Shopping Cart**: Full shopping cart backed by `localStorage` with composite keys (`productId::color::strap::watchFace`) ensuring distinct bespoke configurations are preserved independently.
- **Stock Limit Safeguards**: Quantity selectors clamped to available inventory thresholds with input sanitization.
- **Persistent Wishlist**: Quick toggle to save favorite timepieces with instant indicator badges across the navigation bar and product cards.
- **Simulated Authentication System**: Complete client-side authentication with input validation, session persistence, login, user registration, password recovery request, and protected route guards.
- **Collector Account Dashboard**: Dedicated profile dashboard displaying allocation history, account tier, order receipts, and member perks.
- **Multi-Step Checkout**: Structured checkout flow with form validation, comprehensive Indian state selector, shipping speed tiers, subtotal calculation, and sandbox payment disclaimer.
- **Order Confirmation & Tracking**: Receipt view displaying unique order IDs (e.g., `CHR-2026-XXXXXX`), courier tracking numbers, shipping addresses, and itemized order breakdowns.

### Engineering & Reliability
- **Multi-Tier Error Boundaries**: Top-level application error catching, dedicated R3F canvas error boundary, and an internal GLB loader error boundary.
- **Dual Fallback Strategy**: Automatically falls back to a high-precision procedural 3D model (`ProceduralWatchModel`) or high-resolution studio photography if WebGL or external 3D assets fail to load.
- **WebGL Context Loss Recovery**: Event listeners for `webglcontextlost` and `webglcontextrestored` to gracefully prevent application crashes during GPU driver resets.
- **Hardware-Aware Performance Throttling**: Device pixel ratio (DPR) automatically throttled to `1.0` on mobile devices or hardware with `≤ 4` CPU cores to maintain smooth framerates on low-end hardware.
- **Accessible Design**: Semantic HTML5 landmarks, WAI-ARIA attributes (`role="region"`, `role="radiogroup"`, `aria-live="polite"`), high-contrast amber focus rings, screen reader explanations, and reduced-motion compliance via Framer Motion's `useReducedMotion`.
- **Lightweight Native SEO**: Reusable `usePageSEO` hook dynamically managing document titles, meta descriptions, Open Graph, and Twitter Card tags across every route.

---

## 3. 3D Product Experience Architecture

The 3D presentation system in CHRONOS uses a modular component structure built on Three.js, `@react-three/fiber`, and `@react-three/drei`:

```
ProductDetailPage / InteractiveShowroomSection
       │
       ▼
 ┌──────────────────────────────────────────────────────────┐
 │ ProductViewer.jsx                                        │
 │  ├─ WebGL Support Check & DPR Optimization               │
 │  ├─ Non-intrusive Instructional Micro-Badges             │
 │  ├─ Viewport Controls Toolbar (Auto-Rotate, Reset View)  │
 │  └─ 2D Photography Fallback                              │
 └────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
 ┌──────────────────────────────────────────────────────────┐
 │ WatchScene.jsx                                           │
 │  ├─ R3F Canvas (ACESFilmicToneMapping, PCF Shadows)      │
 │  ├─ WebGL Context Lost / Restored Event Handlers         │
 │  ├─ WatchLighting (Key, Fill, Rim, Ambient Lights)       │
 │  ├─ WatchEnvironment (Studio HDR Reflection Profiles)    │
 │  ├─ WatchControls (OrbitControls with scoped limits)     │
 │  └─ CameraResetController (Smooth delta lerp animation)  │
 └────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
 ┌──────────────────────────────────────────────────────────┐
 │ WatchModel.jsx                                           │
 │  ├─ GLBErrorBoundary                                     │
 │  │    ├─ Primary: GLBWatchModel (useGLTF)                │
 │  │    │    ├─ Mesh Traversal (Case, Screen, Strap)       │
 │  │    │    ├─ Custom PBR Luminance Calculations          │
 │  │    │    └─ onBeforeCompile GLSL Fragment Shader       │
 │  │    └─ Fallback: ProceduralWatchModel                  │
 │  │         └─ Three.js Geometries (Cylinder, Box, etc.)  │
 │  └─ Subtle Floating Idle Wave Oscillation (useFrame)     │
 └──────────────────────────────────────────────────────────┘
```

### Model Structure & Material Segmentation
The primary 3D asset (`public/models/chronos-watch.glb`) is partitioned into three discrete meshes and materials:
1. `Watch_Case` (`Case` material): Aerospace Grade 5 titanium chassis, chamfered outer bezel ring, tactical digital crown dial, and quick-action side buttons.
2. `Watch_Screen` (`Screen` material): LTPO AMOLED display with dial graphics, telemetry rings, and biometric readouts.
3. `Watch_Strap` (`Strap` material): Ergonomic sport band with subtle textured surface and clasp geometry.

### Shader Customization (`onBeforeCompile`)
To ensure readability across all lighting environments, the Black model variant uses custom GLSL shader logic injected directly into Three.js's standard PBR fragment pipeline:
- Calculates luminance and maximum RGB channel intensity of each watch face texel.
- Smoothly elevates non-background UI elements (numerals, health rings, icons, labels) into bright, radiant white (`vec3(1.0, 1.0, 1.0)`) with `1.2` emissive intensity.
- Preserves the deep AMOLED pitch black (`vec3(0.008, 0.008, 0.01)`) background with zero emissive glow.
- Non-black models retain their original vibrant dial coloring and standard shader passes.

---

## 4. E-Commerce Flow

The application provides a complete end-to-end frontend shopping experience:

```
[Home / Showroom] ──► [Collection Catalog] ──► [Product Detail Page]
                                                       │
                                                       ▼
[Order Confirmation] ◄── [Checkout Allocation] ◄── [Cart & Customizer]
```

1. **Discovery & Exploration**: Users explore models via the Hero showcase, Act 06 3D Product Studio, or the Collection Catalog (`/products`) with category filters.
2. **Interactive Configuration**: On the Product Detail page (`/products/:slug`), users inspect the watch in 3D, customize case/strap colors, select dial interfaces, and choose purchase quantities.
3. **Cart & Wishlist Storage**: Items added to the cart are keyed by their specific customization combination (`key: prodId::color::strap::watchFace`), preventing customized variants from overwriting one another.
4. **Protected Checkout**: Navigating to `/checkout` prompts user login or registration via `ProtectedRoute`. The checkout form collects shipping details (with Indian state support) and shipping speed selection.
5. **Simulated Sandbox Processing**: To maintain clear boundaries, payment processing is simulated with realistic network latency (`orderService.js`). No real credit card or banking information is collected.
6. **Order Confirmation & History**: A unique order identifier (`CHR-2026-XXXXXX`) and courier tracking number are generated, saved to `localStorage`, displayed on `/order-success`, and archived in the user's `/account` order history.

---

## 5. Technology Stack

| Technology | Version | Purpose in CHRONOS |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | Core UI library, component architecture, hooks, and virtual DOM |
| **Vite** | `^8.2.0` | Build system, hot module replacement (HMR), and asset bundling |
| **Three.js** | `^0.186.0` | WebGL 3D graphics rendering engine, materials, and lighting |
| **React Three Fiber** | `^9.7.0` | Declarative Three.js scene graph inside React component trees |
| **React Three Drei** | `^10.7.8` | 3D utilities: `useGLTF`, `OrbitControls`, and HTML overlay helpers |
| **Tailwind CSS** | `^4.3.3` | Utility-first styling with `@tailwindcss/vite` integration |
| **Framer Motion** | `^12.43.0` | Scroll-driven section reveals, layout transitions, and reduced motion |
| **GSAP** | `^3.15.0` | High-performance animation engine for programmatic timing |
| **React Router DOM** | `^7.18.2` | Client-side routing, route parameters, and protected routes |
| **React Hook Form** | `^7.84.0` | Controlled form state management and input validation |
| **Lucide React** | `^1.45.0` | Minimalist iconography matching the luxury dark aesthetic |
| **React Icons** | `^5.7.0` | Supplementary interface icon sets |
| **Axios** | `^1.19.0` | HTTP client abstraction layer for future REST API endpoints |
| **date-fns** | `^4.4.0` | Date formatting and timestamp utilities |
| **Oxlint** | `^1.75.0` | Rust-based static code analysis and linting |

---

## 6. Project Architecture

```
CHRONOS/
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML5 entry template with dark mode class
├── LICENSE                     # MIT License
├── package.json                # Project dependencies and script declarations
├── vite.config.js              # Vite configuration with manual vendor chunking
│
├── public/
│   ├── assets/                 # High-resolution product photography & fallback renders
│   ├── favicon.svg             # Custom geometric brand favicon
│   ├── models/
│   │   ├── chronos-watch.glb   # Draco-compressed production 3D smartwatch model
│   │   ├── chronos-watch.blend # Blender 5.2 master 3D project source file
│   │   └── *.png               # Model textures, watch dials, and verification renders
│   ├── robots.txt              # Search engine crawler directives
│   └── sitemap.xml             # Search engine XML sitemap
│
└── src/
    ├── App.jsx                 # Route declarations, context providers, and layout wrapper
    ├── main.jsx                # React root mount entry point
    │
    ├── assets/                 # Bundled visual assets
    ├── components/
    │   ├── auth/
    │   │   └── ProtectedRoute.jsx       # Route guard redirecting unauthenticated users
    │   ├── cart/
    │   │   ├── CartItem.jsx             # Individual cart item card with customization pills
    │   │   └── CartSummary.jsx          # Subtotal, shipping, and checkout CTA panel
    │   ├── home/
    │   │   ├── CollectionPreviewSection.jsx # Category card preview grid
    │   │   ├── FeaturesSection.jsx      # Engineering feature highlight matrix
    │   │   ├── FinalCTASection.jsx      # Bottom conversion banner
    │   │   ├── HeroSection.jsx          # Cinematic hero with brand tagline
    │   │   ├── InteractiveShowroomSection.jsx # Act 06 3D Product Studio with live viewer
    │   │   ├── LifestyleSection.jsx     # Brand editorial visual storytelling
    │   │   ├── ShowcaseSection.jsx      # Key product model showcase
    │   │   └── TechnologySection.jsx    # Engineering breakdown teaser
    │   ├── layout/
    │   │   ├── Footer.jsx               # Comprehensive navigation footer
    │   │   ├── Layout.jsx               # App shell containing Navbar, Outlet, and Footer
    │   │   ├── Navbar.jsx               # Sticky navbar with cart/wishlist badges and mobile menu
    │   │   └── ScrollToTop.jsx          # Auto-scroll restoration on route changes
    │   ├── product/
    │   │   ├── ProductCard.jsx          # Catalog product card with quick actions
    │   │   ├── ProductFilters.jsx       # Category filter pills
    │   │   └── ProductGrid.jsx          # Responsive product grid container
    │   ├── three/
    │   │   ├── ProductViewer.jsx        # Primary 3D viewport container with toolbar & fallbacks
    │   │   ├── WatchControls.jsx        # OrbitControls with clamped distance and rotation limits
    │   │   ├── WatchCustomizer.jsx      # Swatch selector for Case finishes and Dial styles
    │   │   ├── WatchEnvironment.jsx     # Studio HDR reflections and environmental fill
    │   │   ├── WatchLighting.jsx        # Key, fill, rim, and ambient studio light rig
    │   │   ├── WatchModel.jsx           # GLB loader, material traversal, shaders & procedural fallback
    │   │   └── WatchScene.jsx           # R3F Canvas, ACESFilmic tone mapping, and camera lerp reset
    │   └── ui/
    │       ├── Button.jsx               # Reusable styled button component (gold, dark, outline)
    │       ├── DynamicBackground.jsx    # Ambient background gradient canvas
    │       ├── ErrorBoundary.jsx        # React error boundary with luxury recovery UI
    │       ├── FeatureCard.jsx          # Spec/feature card display
    │       ├── Loader.jsx               # Minimalist animated loading spinner
    │       ├── Modal.jsx                # Accessible dialog modal
    │       ├── SearchBar.jsx            # Catalog search input
    │       └── Toast.jsx                # Ephemeral feedback alerts
    │
    ├── context/
    │   ├── AuthContext.jsx              # User session, login, registration, and logout state
    │   ├── CartContext.jsx              # Cart items, quantity updates, composite keys, and totals
    │   ├── CustomizerContext.jsx        # Global active 3D customization state
    │   └── WishlistContext.jsx          # Wishlist toggles and saved product collection
    │
    ├── data/
    │   └── products.js                  # Complete mock product catalog and specs
    │
    ├── hooks/
    │   ├── useAuth.js                   # Hook consuming AuthContext
    │   ├── useCart.js                   # Hook consuming CartContext
    │   ├── useCustomizer.js             # Hook consuming CustomizerContext
    │   ├── usePageSEO.js                # Dynamic document title and meta tag manager
    │   └── useWishlist.js               # Hook consuming WishlistContext
    │
    ├── pages/
    │   ├── account/AccountPage.jsx      # Collector profile, order records, and settings
    │   ├── auth/
    │   │   ├── ForgotPasswordPage.jsx   # Password recovery request form
    │   │   ├── LoginPage.jsx            # Member login portal
    │   │   └── RegisterPage.jsx         # New member registration portal
    │   ├── cart/CartPage.jsx            # Full shopping bag view with customization summary
    │   ├── checkout/CheckoutPage.jsx    # Multi-step allocation checkout with address validation
    │   ├── home/HomePage.jsx            # Landing page assembling all homepage sections
    │   ├── product/ProductDetailPage.jsx# Product detail view with 3D viewer & spec sheet
    │   ├── products/ProductsPage.jsx    # Product catalog with category filtering
    │   ├── static/
    │   │   ├── AboutPage.jsx            # Brand mission and heritage
    │   │   ├── ContactPage.jsx          # Concierge inquiries form
    │   │   ├── NotFoundPage.jsx         # 404 page with navigation links
    │   │   ├── OrderSuccessPage.jsx     # Order confirmation and delivery telemetry receipt
    │   │   ├── PrivacyPage.jsx          # Privacy policy documentation
    │   │   ├── ReturnsPage.jsx          # Returns and warranty guidelines
    │   │   ├── ShippingPage.jsx         # Global courier delivery terms
    │   │   ├── TermsPage.jsx            # Terms of service documentation
    │   │   └── WishlistPage.jsx         # Saved timepieces collection view
    │   └── technology/TechnologyPage.jsx# Interactive engineering deep-dive
    │
    ├── services/
    │   ├── authService.js               # Authentication business logic and session storage
    │   └── orderService.js              # Order generation, validation, and archive persistence
    │
    ├── styles/
    │   └── index.css                    # Tailwind CSS imports, custom scrollbars, and dark theme tokens
    │
    └── utils/
        ├── constants.js                 # Brand constants, navigation links, and category IDs
        └── formatters.js                # Currency, rating, and string truncation utilities
```

---

## 7. Application Routes

| Path | Page Component | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Brand landing page with Hero, Showroom, Features, and Storytelling |
| `/products` | `ProductsPage` | Public | Full product collection catalog with category filters |
| `/products/:slug` | `ProductDetailPage` | Public | Interactive 3D model viewer, material customizer, and specs |
| `/technology` | `TechnologyPage` | Public | Deep-dive into display, processing, sensor, and battery tech |
| `/cart` | `CartPage` | Public | Shopping bag with customization breakdown and subtotal |
| `/wishlist` | `WishlistPage` | Public | Saved watches list with quick-add to cart |
| `/login` | `LoginPage` | Public | Account authentication portal |
| `/register` | `RegisterPage` | Public | Account registration portal |
| `/forgot-password` | `ForgotPasswordPage` | Public | Account recovery and password reset request |
| `/account` | `AccountPage` | Protected | Collector dashboard, profile info, and order history |
| `/checkout` | `CheckoutPage` | Protected | Multi-step shipping and allocation checkout |
| `/order-success` | `OrderSuccessPage` | Public | Order receipt with generated ID and tracking details |
| `/about` | `AboutPage` | Public | Heritage, design philosophy, and craftsmanship |
| `/contact` | `ContactPage` | Public | Concierge service inquiry form |
| `/shipping` | `ShippingPage` | Public | Global shipping policies and delivery timelines |
| `/returns` | `ReturnsPage` | Public | Return conditions and international warranty terms |
| `/privacy` | `PrivacyPage` | Public | Data privacy standards and cookie policy |
| `/terms` | `TermsPage` | Public | Terms of service and legal agreement |
| `*` | `NotFoundPage` | Public | 404 page with return-to-home and collection links |

---

## 8. Product Data Architecture

All smartwatch timepieces are structured within `src/data/products.js` using a consistent schema:

```javascript
{
  id: 'chronos-pro-1',
  name: 'Chronos Pro',
  slug: 'chronos-pro',
  description: 'The definitive luxury smartwatch engineered with surgical titanium...',
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
}
```

---

## 9. Performance & Optimization

- **Route-Level Code Splitting**: Every page component is loaded lazily via `React.lazy()` wrapped in React `Suspense` with an accessible fallback loader, reducing initial JavaScript bundle transfer.
- **Manual Vendor Chunking**: Configured in `vite.config.js` via `rollupOptions.output.manualChunks` to isolate large dependencies:
  - `three-vendor`: Three.js and React Three Fiber/Drei packages (~990 kB minified / ~265 kB gzipped).
  - `react-vendor`: React core, Framer Motion, and Lucide React (~410 kB minified / ~130 kB gzipped).
- **Adaptive DPR Capping**: Device Pixel Ratio is throttled to `1.0` on mobile viewports or devices with `navigator.hardwareConcurrency <= 4`, and capped at `1.5` on high-density desktop displays to prevent GPU thermal throttling.
- **Draco Mesh Compression**: The 3D GLB model uses Draco geometry compression, reducing geometry payload transfer while preserving high vertex fidelity.
- **Optimized Three.js Traversal**: Material cloning and updates are performed inside `useEffect` triggered only when the active finish changes. `useMemo` is used to cache scene clones and color calculations, preventing unnecessary frame re-computations.
- **Custom Shader Caching**: Three.js `customProgramCacheKey` hooks ensure WebGL shader programs are cached correctly when toggling between custom shader passes and standard materials.
- **CSS Performance**: Tailwind CSS v4 delivers a minimal CSS footprint with automated purging of unused utility classes.

---

## 10. Error Handling & Fallbacks

1. **Top-Level ErrorBoundary (`src/components/ui/ErrorBoundary.jsx`)**: Catches unexpected render crashes and presents a themed recovery screen with a "Reload Application" button, preserving brand aesthetics.
2. **WebGL Availability Detection (`ProductViewer.jsx`)**: Programmatically probes for WebGL support on mount (`canvas.getContext('webgl2')`). If unavailable, the viewer falls back to high-resolution studio photography with an informative message.
3. **WebGL Context Loss Handler (`WatchScene.jsx`)**: Attaches event listeners for `webglcontextlost` and `webglcontextrestored`, preventing application lockups when GPU drivers reset.
4. **GLB Model Fallback (`GLBErrorBoundary` in `WatchModel.jsx`)**: If the external `.glb` file cannot be retrieved or decoded, an internal error boundary seamlessly renders `ProceduralWatchModel`—a procedural 3D smartwatch built with native Three.js geometries that mirrors the chosen case and strap colors.
5. **Catalog & Slug Fallback (`ProductDetailPage.jsx`)**: Accessing an invalid or non-existent product slug (e.g., `/products/invalid-watch`) renders a "Timepiece Not Found" view with curated alternative models and a return-to-collection link.
6. **Corrupted Data Guards**: All `localStorage` reads (`CartContext`, `WishlistContext`, `authService`, `orderService`) are wrapped in `try/catch` blocks with schema validation, discarding corrupted cache entries and restoring stable state gracefully.

---

## 11. Accessibility (a11y)

- **Semantic Landmarks**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`) are used throughout the application.
- **WAI-ARIA Toolbar & Viewports**:
  - 3D viewports are marked with `role="region"` and descriptive `aria-label` attributes explaining how to rotate and zoom.
  - Screen reader-only (`sr-only`) instructional text outlines keyboard and touch interaction.
  - Interactive customizers utilize `role="radiogroup"` with individual swatch options mapped to `role="radio"` and `aria-checked`.
  - Dynamic status changes utilize `aria-live="polite"` to announce active color and watch face updates.
- **Focus Management**: Form inputs, buttons, and custom swatches have high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2`).
- **Reduced Motion Support**: Framer Motion animations query `useReducedMotion()`. When a user enables reduced motion in their operating system, transition durations collapse to `0` or minimal fades, respecting user accessibility preferences.

---

## 12. Installation & Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or equivalent package manager)
- **Git**: Installed and configured

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shreyas-Patil-019/Chronos-smartwatch.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Chronos-smartwatch
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5173` (or the port specified in terminal output).

---

## 13. Environment Variables

The project includes an environment variables template at `.env.example`:

```bash
# Application Details
VITE_APP_NAME="CHRONOS"
VITE_APP_TAGLINE="TIME. REIMAGINED."
VITE_APP_VERSION="1.0.0"

# API Base URL (For Future Backend Integration)
VITE_API_BASE_URL="https://api.chronos3d.com/v1"

# Stripe / Payment Public Key (For Future Phase)
VITE_STRIPE_PUBLIC_KEY="pk_test_placeholder"

# Asset Base URL
VITE_ASSET_BASE_URL="/"
```

To configure custom environment variables:
```bash
cp .env.example .env
```

> **Note**: No external API keys or secrets are required to run the project locally. All authentication, customization, and checkout workflows operate out-of-the-box using the simulated client-side service layer.

---

## 14. Production Build

To compile the optimized production bundle:

```bash
npm run build
```

This invokes Vite's production build pipeline with Rollup chunking, outputting minified HTML, CSS, and JavaScript assets to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 15. Code Quality & Verification

The project includes static analysis and linting via [Oxlint](https://oxc.rs/):

```bash
npm run lint
```

- **Linter**: `oxlint` validates JavaScript/JSX syntax, potential runtime bugs, and React best practices.
- **Build Verification**: Verified via `npm run build` producing zero compilation errors.

---

## 16. Learning Outcomes & Technical Competencies

Building CHRONOS demonstrated and reinforced core full-stack frontend and computer graphics competencies:

1. **Modern React Architecture**: Practical mastery of React 19, functional components, hooks (`useMemo`, `useCallback`, `useRef`, `useContext`), custom hooks (`usePageSEO`), React Context for global state, and code splitting with `React.lazy` and `Suspense`.
2. **Interactive 3D WebGL Programming**: Integrating Three.js into React via React Three Fiber and Drei; managing scene graphs, lighting rigs, OrbitControls, camera lerping, physical materials (PBR), and custom GLSL fragment shader modification (`onBeforeCompile`).
3. **Design Systems & Responsive Layouts**: Implementing a cohesive luxury aesthetic using Tailwind CSS v4, managing responsive viewports, off-canvas navigation, and accessible interactive swatches.
4. **State Management & Persistence**: Engineering client-side persistence layers with `localStorage`, building composite keys for complex product configurations, and protecting against data corruption.
5. **Resilient Error Engineering**: Designing multi-layer fallback strategies, from procedural 3D fallbacks and 2D photography fallbacks to WebGL context loss recovery.
6. **Accessibility & User Experience**: Writing semantic markup, managing WAI-ARIA roles, supporting keyboard navigation, and integrating OS-level reduced motion preferences.

---

## 17. Future Roadmap

Planned enhancements for future iterations of CHRONOS:

- [ ] **Backend Service Integration**: Node.js/Express, Go, or Supabase backend replacing the mock service layer.
- [ ] **Database & User Persistence**: PostgreSQL / Prisma integration for permanent user accounts and order histories.
- [ ] **Live Payment Gateway**: Full Stripe Elements or Razorpay integration with webhook order verification.
- [ ] **Automated Testing Suite**: Unit testing with Vitest / React Testing Library and end-to-end testing with Playwright.
- [ ] **AR Quick Look**: WebXR / Apple AR Quick Look integration for inspecting timepieces in augmented reality on mobile devices.
- [ ] **Interactive Watch Faces**: Interactive animated clock dials with live time synchronization and selectable complications.
- [ ] **Admin Dashboard**: Store manager portal for catalog inventory management, order fulfillment, and sales analytics.

---

## 18. Author

**Shreyas Patil**  
- **GitHub**: [@Shreyas-Patil-019](https://github.com/Shreyas-Patil-019)  
- **Project Repository**: [Chronos-smartwatch](https://github.com/Shreyas-Patil-019/Chronos-smartwatch)

---

## 19. License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for complete license terms.

```
Copyright (c) 2026 Shreyas-Patil-019
```
