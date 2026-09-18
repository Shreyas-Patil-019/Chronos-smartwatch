import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import WatchModel from './WatchModel';
import WatchLighting from './WatchLighting';
import WatchControls from './WatchControls';
import WatchEnvironment from './WatchEnvironment';
import ErrorBoundary from '../ui/ErrorBoundary';

/**
 * R3F Canvas Loading Component — "LOADING CHRONOS"
 */
const CanvasLoader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-5 text-center space-y-3 pointer-events-none bg-zinc-950/80 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-2xl">
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping" />
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="space-y-0.5">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase whitespace-nowrap block">
          LOADING CHRONOS
        </span>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
          INITIALIZING 3D ENGINE
        </span>
      </div>
    </div>
  </Html>
);

/**
 * Smooth Camera Reset Controller
 * Lerps camera position and OrbitControls target back to default orientation smoothly.
 */
const CameraResetController = ({ isResetting, onResetComplete, controlsRef }) => {
  const defaultPos = useRef(new THREE.Vector3(0, 1.8, 5.2));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!isResetting) return;

    const camera = state.camera;
    const controls = controlsRef?.current;

    // Lerp camera position
    camera.position.lerp(defaultPos.current, delta * 6);

    // Lerp OrbitControls target if present
    if (controls) {
      controls.target.lerp(defaultTarget.current, delta * 6);
      controls.update();
    }

    // Check if close enough to default orientation to complete reset
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

/**
 * 3D R3F Canvas Container Component Architecture
 */
export const WatchScene = ({
  color = '#121214',
  strap = 'silicone-black',
  autoRotate = false,
  enableMouseInteraction = false,
  scale = 1,
  dpr = null,
  modelUrl = '/models/chronos-watch.glb',
  className = 'w-full h-full',
  isResetting = false,
  onResetComplete = null,
  controlsRef = null,
}) => {
  const internalControlsRef = useRef();
  const activeControlsRef = controlsRef || internalControlsRef;

  // Responsive device pixel ratio capping for low-end laptops & mobile
  const effectiveDpr = dpr !== null ? dpr : (typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 1, 1.5)] : 1);

  const handleContextLost = (event) => {
    event.preventDefault();
    console.warn('CHRONOS WebGL context lost. Attempting recovery...');
  };

  const handleContextRestored = () => {
    console.info('CHRONOS WebGL context successfully restored.');
  };

  return (
    <div className={`relative touch-none ${className}`}>
      <ErrorBoundary
        fallback={
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2 bg-zinc-950/60 rounded-2xl border border-zinc-800">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              3D EXPERIENCE UNAVAILABLE
            </span>
            <span className="text-[11px] text-zinc-400 font-sans">
              Unable to load interactive 3D model.
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.8, 5.2], fov: 42 }}
          dpr={effectiveDpr}
          shadows={{ type: THREE.PCFShadowMap }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'mediump',
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            const canvasEl = gl.domElement;
            if (canvasEl) {
              canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
              canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);
            }
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <WatchLighting />
            <WatchModel
              color={color}
              strap={strap}
              enableMouseInteraction={enableMouseInteraction}
              scale={scale}
              modelUrl={modelUrl}
            />
            <WatchEnvironment />
            <WatchControls
              ref={activeControlsRef}
              autoRotate={autoRotate}
              enableZoom={true}
            />
            <CameraResetController
              isResetting={isResetting}
              onResetComplete={onResetComplete}
              controlsRef={activeControlsRef}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default WatchScene;
