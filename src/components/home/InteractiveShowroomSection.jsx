import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WatchModel from '../three/WatchModel';
import WatchLighting from '../three/WatchLighting';
import WatchEnvironment from '../three/WatchEnvironment';
import ErrorBoundary from '../ui/ErrorBoundary';
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Sparkles, Hand, Eye } from 'lucide-react';

const ControlledWatchScene = ({ finish, isAutoRotating, dpr }) => {
  const controlsRef = useRef();

  return (
    <>
      <WatchLighting />
      <WatchModel color={finish.color} strap={finish.strap} enableMouseInteraction={false} scale={1.1} />
      <WatchEnvironment />
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        autoRotate={isAutoRotating}
        autoRotateSpeed={1.5}
        minDistance={3.5}
        maxDistance={8}
        rotateSpeed={0.8}
        zoomSpeed={0.8}
      />
    </>
  );
};

export const InteractiveShowroomSection = () => {
  const [selectedFinish, setSelectedFinish] = useState({
    color: '#121214',
    name: 'Space Black Titanium',
    strap: 'silicone-black',
  });

  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomKey, setZoomKey] = useState(0);

  const finishes = [
    { color: '#121214', name: 'Space Black Titanium', strap: 'silicone-black' },
    { color: '#52525b', name: 'Raw Titanium Silver', strap: 'titanium-gray' },
    { color: '#78350f', name: 'Rose Gold Bronze', strap: 'leather-brown' },
  ];

  const handleResetView = () => {
    setZoomKey((prev) => prev + 1);
  };

  return (
    <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      {/* Section Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
            DEDICATED 3D SHOWROOM
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight">
          EXPLORE CHRONOS <span className="text-amber-400">IN 3D</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Interact with the smartwatch in real-time. Drag to rotate 360°, scroll to zoom, and customize materials.
        </p>
      </div>

      {/* Self-Contained Interactive 3D Card Boundary */}
      <div className="relative max-w-4xl mx-auto h-[480px] sm:h-[560px] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl group">
        {/* Subtle Ambient Studio Light Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-blue-500/5 to-transparent pointer-events-none" />

        {/* Instruction Badges inside Viewer */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md">
            <Hand className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
              Drag to rotate
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md hidden sm:flex">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Scroll / pinch to zoom
            </span>
          </div>
        </div>

        {/* Material Finish Swatches (Top-Right inside Viewer) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md">
          {finishes.map((f) => (
            <button
              key={f.name}
              onClick={() => setSelectedFinish(f)}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                selectedFinish.name === f.name ? 'border-amber-400 scale-125' : 'border-zinc-700 hover:scale-110'
              }`}
              style={{ backgroundColor: f.color }}
              title={f.name}
              aria-label={`Select finish ${f.name}`}
            />
          ))}
        </div>

        {/* 3D Canvas Area */}
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <ErrorBoundary
            fallback={
              <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
                3D Interactive Viewer Ready
              </div>
            }
          >
            <Canvas
              key={zoomKey}
              camera={{ position: [0, 1.8, 5.2], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ControlledWatchScene finish={selectedFinish} isAutoRotating={isAutoRotating} />
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Bottom Interactive Toolbar Controls inside Viewer */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
            title={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-label="Toggle auto rotate"
          >
            {isAutoRotating ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <button
            onClick={handleResetView}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
            title="Reset product view"
            aria-label="Reset product view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <span className="text-[10px] font-mono text-zinc-400 px-2 uppercase tracking-widest hidden sm:inline">
            {selectedFinish.name}
          </span>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowroomSection;
