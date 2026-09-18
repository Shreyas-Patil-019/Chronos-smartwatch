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
  fallbackImage = '/assets/chronos-pro-main.jpg',
  showControls = true,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const [isAutoRotating, setIsAutoRotating] = useState(initialAutoRotate);
  const [isResetting, setIsResetting] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
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
      <div className={`relative flex flex-col items-center justify-center bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 text-center space-y-4 ${className}`}>
        {fallbackImage && (
          <div className="w-44 h-44 flex items-center justify-center">
            <img
              src={fallbackImage}
              alt="CHRONOS Luxury Timepiece"
              className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
            />
          </div>
        )}
        <div className="space-y-1 max-w-xs">
          <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
            3D VIEW UNAVAILABLE
          </h4>
          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
            Your device or browser does not currently support the required 3D experience. Displaying luxury timepiece photography.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Interactive 3D smartwatch model viewport. Drag with mouse or swipe on touch to rotate 360 degrees. Pinch or scroll to zoom."
      tabIndex={0}
      className={`relative overflow-hidden group touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      {/* Screen Reader Only Detailed Description */}
      <span className="sr-only">
        Interactive 3D viewport displaying CHRONOS smartwatch model. Use mouse drag or touch drag to rotate the watch 360 degrees. Use the interactive controls toolbar at the bottom to toggle auto-rotation or reset view orientation.
      </span>

      {/* Non-intrusive Instructional Micro-Badges */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none" aria-hidden="true">
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

      {/* 3D Scene Viewport with Fallback */}
      <ErrorBoundary
        fallback={
          <div className="flex flex-col items-center justify-center h-full bg-zinc-950/80 rounded-2xl border border-zinc-800 p-6 text-center space-y-4">
            {fallbackImage && (
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src={fallbackImage}
                  alt="CHRONOS Timepiece Gallery Render"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>
            )}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                3D EXPERIENCE UNAVAILABLE
              </span>
              <span className="text-[11px] text-zinc-400 font-sans block">
                Unable to load the interactive model. Displaying high-precision gallery render.
              </span>
            </div>
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
        <div
          role="toolbar"
          aria-label="3D Viewport Controls"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-xl"
        >
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-pressed={isAutoRotating}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" /> : <Play className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
          <div className="w-px h-3.5 bg-zinc-800" aria-hidden="true" />
          <button
            onClick={handleResetView}
            className={`p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isResetting ? 'animate-spin text-amber-400' : ''}`}
            title="Reset product view orientation"
            aria-label="Reset product view orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductViewer;
