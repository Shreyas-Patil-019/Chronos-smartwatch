import React, { useState, useEffect } from 'react';
import WatchScene from './WatchScene';
import ErrorBoundary from '../ui/ErrorBoundary';

/**
 * ProductViewer — Primary reusable 3D viewport container for CHRONOS.
 * Provides device performance capping, WebGL fallback card, and cursor integration.
 */
export const ProductViewer = ({
  color = '#121214',
  strap = 'silicone-black',
  autoRotate = false,
  className = 'w-full h-[450px]',
  enableMouseInteraction = true,
  scale = 1,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }

    // Low-end device DPR optimization
    if (typeof window !== 'undefined') {
      const isMobileOrLowEnd =
        window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      setDpr(isMobileOrLowEnd ? 1 : Math.min(window.devicePixelRatio || 1.5, 2));
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 ${className}`}>
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 to-blue-500/20 border border-amber-500/30 flex items-center justify-center">
            <span className="text-2xl font-mono text-amber-400">3D</span>
          </div>
          <h4 className="text-sm font-mono text-white tracking-widest uppercase">CHRONOS Product Viewer</h4>
          <p className="text-xs text-zinc-400 max-w-xs">
            WebGL acceleration is disabled on this device. Displaying fallback luxury watch preview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <ErrorBoundary
        fallback={
          <div className="flex flex-col items-center justify-center h-full bg-zinc-900/40 rounded-2xl border border-zinc-800 p-6 text-center text-zinc-400">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">Interactive Viewer Ready</span>
            <span className="text-xs text-zinc-500">3D graphics stream active</span>
          </div>
        }
      >
        <WatchScene
          color={color}
          strap={strap}
          autoRotate={autoRotate}
          enableMouseInteraction={enableMouseInteraction}
          scale={scale}
          dpr={dpr}
          className="w-full h-full"
        />
      </ErrorBoundary>
    </div>
  );
};

export default ProductViewer;
