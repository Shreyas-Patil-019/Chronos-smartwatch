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
 * R3F Canvas Loading Spinner Component
 */
const CanvasLoader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 pointer-events-none">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase whitespace-nowrap">
        Loading 3D Smartwatch...
      </span>
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
  dpr = 1.5,
  modelUrl = '/models/chronos-watch.glb',
  className = 'w-full h-full',
  isResetting = false,
  onResetComplete = null,
  controlsRef = null,
}) => {
  const internalControlsRef = useRef();
  const activeControlsRef = controlsRef || internalControlsRef;

  return (
    <div className={`relative touch-none ${className}`}>
      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm font-mono">
            3D Stream Unavailable
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.8, 5.2], fov: 42 }}
          dpr={dpr}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
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
