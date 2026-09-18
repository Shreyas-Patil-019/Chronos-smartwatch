import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import WatchModel from '../three/WatchModel';
import WatchLighting from '../three/WatchLighting';
import WatchEnvironment from '../three/WatchEnvironment';
import WatchControls from '../three/WatchControls';
import ErrorBoundary from '../ui/ErrorBoundary';
import { RotateCcw, Play, Pause, Sparkles, Hand, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getFadeInUp = (shouldReduce) => ({
  hidden: { opacity: 0, y: shouldReduce ? 0 : 35 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduce ? 0 : 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: shouldReduce ? 0 : custom * 0.1,
    },
  }),
});

const CanvasLoader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 pointer-events-none">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase whitespace-nowrap">
        Loading 3D Studio...
      </span>
    </div>
  </Html>
);

/**
 * Smooth Camera Reset lerper for Showroom
 */
const ShowroomResetController = ({ isResetting, onResetComplete, controlsRef }) => {
  const defaultPos = useRef(new THREE.Vector3(0, 1.8, 5.2));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!isResetting) return;

    const camera = state.camera;
    const controls = controlsRef?.current;

    camera.position.lerp(defaultPos.current, delta * 6);

    if (controls) {
      controls.target.lerp(defaultTarget.current, delta * 6);
      controls.update();
    }

    if (camera.position.distanceTo(defaultPos.current) < 0.05) {
      camera.position.copy(defaultPos.current);
      if (controls) {
        controls.target.copy(defaultTarget.current);
        controls.update();
      }
      if (onResetComplete) {
        onResetComplete();
      }
    }
  });

  return null;
};

const ControlledWatchScene = ({ finish, isAutoRotating, isResetting, onResetComplete, controlsRef }) => {
  return (
    <>
      <WatchLighting />
      <Suspense fallback={<CanvasLoader />}>
        <WatchModel
          color={finish.color}
          strap={finish.strap}
          enableMouseInteraction={false}
          scale={1.1}
        />
        <WatchEnvironment />
      </Suspense>
      <WatchControls
        ref={controlsRef}
        enableZoom={true}
        autoRotate={isAutoRotating}
        autoRotateSpeed={1.5}
        minDistance={2.8}
        maxDistance={8.0}
      />
      <ShowroomResetController
        isResetting={isResetting}
        onResetComplete={onResetComplete}
        controlsRef={controlsRef}
      />
    </>
  );
};

export const InteractiveShowroomSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const fadeInUp = getFadeInUp(shouldReduceMotion);
  const [selectedFinish, setSelectedFinish] = useState({
    color: '#121214',
    name: 'Space Black Titanium',
    strap: 'silicone-black',
  });

  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const controlsRef = useRef(null);

  const finishes = [
    { color: '#121214', name: 'Space Black Titanium', strap: 'silicone-black' },
    { color: '#52525b', name: 'Raw Titanium Silver', strap: 'titanium-gray' },
    { color: '#78350f', name: 'Rose Gold Bronze', strap: 'leather-brown' },
  ];

  const handleResetView = () => {
    setIsResetting(true);
  };

  const handleResetComplete = () => {
    setIsResetting(false);
  };

  return (
    <section id="3d-showroom" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 border-t border-zinc-900">
      {/* Background Radial Studio Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Section Title Entrance */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center space-y-4 max-w-2xl mx-auto mb-14"
      >
        <motion.div variants={fadeInUp} custom={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-amber-400/30 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              ACT 06 // 3D PRODUCT STUDIO
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          custom={1}
          className="text-4xl sm:text-6xl font-black text-white uppercase font-mono tracking-tight"
        >
          EXPLORE CHRONOS <span className="text-amber-400">IN 3D</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-sm text-zinc-400 font-sans leading-relaxed"
        >
          Inspect precision engineering from every angle. Drag to rotate 360°, scroll to zoom, and test material finishes in real-time.
        </motion.p>
      </motion.div>

      {/* Self-Contained Interactive 3D Card Boundary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto h-[460px] sm:h-[540px] bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl group touch-none"
      >
        {/* Studio Lighting Radial Bloom */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/5 pointer-events-none" />

        {/* Instruction Badges inside Viewer */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md">
            <Hand className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-300 uppercase tracking-wider sm:tracking-widest">
              DRAG TO ROTATE
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md hidden md:flex">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              SCROLL / PINCH TO ZOOM
            </span>
          </div>
        </div>

        {/* Material Finish Swatches (Top-Right inside Viewer) */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md">
          {finishes.map((f) => (
            <button
              key={f.name}
              onClick={() => setSelectedFinish(f)}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-transform cursor-pointer ${
                selectedFinish.name === f.name ? 'border-amber-400 scale-125 shadow-lg' : 'border-zinc-700 hover:scale-110'
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
                3D Interactive Studio Ready
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 1.8, 5.2], fov: 42 }}
              dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 1, 1.5)] : 1}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                precision: 'mediump',
                stencil: false,
                depth: true,
              }}
            >
              <ControlledWatchScene
                finish={selectedFinish}
                isAutoRotating={isAutoRotating}
                isResetting={isResetting}
                onResetComplete={handleResetComplete}
                controlsRef={controlsRef}
              />
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Bottom Interactive Toolbar Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition cursor-pointer"
            title={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-label="Toggle auto rotate"
          >
            {isAutoRotating ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <button
            onClick={handleResetView}
            className={`p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition cursor-pointer ${isResetting ? 'animate-spin text-amber-400' : ''}`}
            title="Reset product view orientation"
            aria-label="Reset product view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <span className="text-[10px] font-mono text-zinc-400 px-2 uppercase tracking-widest hidden sm:inline">
            {selectedFinish.name}
          </span>
        </div>
      </motion.div>

      {/* Showroom CTA Anchor leading into Collection */}
      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition"
        >
          <span>Configure Your Custom Model In Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default InteractiveShowroomSection;
