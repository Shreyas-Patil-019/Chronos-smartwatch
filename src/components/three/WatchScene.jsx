import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WatchModel from './WatchModel';
import WatchLighting from './WatchLighting';
import WatchControls from './WatchControls';
import WatchEnvironment from './WatchEnvironment';
import ErrorBoundary from '../ui/ErrorBoundary';

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
          <Suspense fallback={null}>
            <WatchLighting />
            <WatchModel
              color={color}
              strap={strap}
              enableMouseInteraction={enableMouseInteraction}
              scale={scale}
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
