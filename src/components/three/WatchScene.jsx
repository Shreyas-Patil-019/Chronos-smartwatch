import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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
 * 3D R3F Canvas Container Component Architecture
 */
export const WatchScene = ({
  color = '#121214',
  strap = 'silicone-black',
  autoRotate = false,
  enableMouseInteraction = true,
  scale = 1,
  dpr = 1.5,
  modelUrl = '/models/chronos-watch.glb',
  className = 'w-full h-full',
}) => {
  return (
    <div className={`relative ${className}`}>
      <ErrorBoundary fallback={<div className="flex items-center justify-center h-full text-zinc-500 text-sm font-mono">3D Stream Unavailable</div>}>
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
            <WatchControls autoRotate={autoRotate} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default WatchScene;
