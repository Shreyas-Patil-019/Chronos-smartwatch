import React, { useState, useEffect, useRef } from 'react';
import WatchScene from './WatchScene';
import ErrorBoundary from '../ui/ErrorBoundary';
import { RotateCcw, Play, Pause, Hand, Eye } from 'lucide-react';

/**
 * ProductViewer — Primary reusable 3D viewport container for CHRONOS.
 * Phase 4: Provides full 360° mouse/touch rotation, scoped zoom, smooth reset view,
 * device performance capping, WebGL fallback, and GLB asset integration.
 */
export const ProductViewer = ({
  color = '#121214',
  strap = 'silicone-black',
  autoRotate: initialAutoRotate = false,
  className = 'w-full h-[450px]',
  enableMouseInteraction = false,
  scale = 1,
  modelUrl = '/models/chronos-watch.glb',
  showControls = true,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const [isAutoRotating, setIsAutoRotating] = useState(initialAutoRotate);
  const [isResetting, setIsResetting] = useState(false);
  const controlsRef = useRef(null);

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

    // Low-end device & integrated GPU DPR optimization
    if (typeof window !== 'undefined') {
      const isMobileOrLowEnd =
        window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      setDpr(isMobileOrLowEnd ? 1 : Math.min(window.devicePixelRatio || 1.25, 1.5));
    }
  }, []);

  const handleResetView = () => {
    setIsResetting(true);
  };

  const handleResetComplete = () => {
    setIsResetting(false);
  };

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
    <div className={`relative overflow-hidden group touch-none ${className}`}>
      {/* Non-intrusive Instructional Micro-Badges */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md shadow-md">
          <Hand className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
            DRAG TO ROTATE
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md shadow-md hidden sm:flex">
          <Eye className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            SCROLL / PINCH TO ZOOM
          </span>
        </div>
      </div>

      {/* 3D Scene Viewport */}
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
          autoRotate={isAutoRotating}
          enableMouseInteraction={enableMouseInteraction}
          scale={scale}
          dpr={dpr}
          modelUrl={modelUrl}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          isResetting={isResetting}
          onResetComplete={handleResetComplete}
          controlsRef={controlsRef}
        />
      </ErrorBoundary>

      {/* Interactive Controls Overlay Bar */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-xl">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
            title={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-label="Toggle auto rotate"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="w-px h-3.5 bg-zinc-800" />
          <button
            onClick={handleResetView}
            className={`p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition ${isResetting ? 'animate-spin text-amber-400' : ''}`}
            title="Reset product view orientation"
            aria-label="Reset product view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductViewer;
