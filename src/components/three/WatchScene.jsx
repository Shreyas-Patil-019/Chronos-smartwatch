import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WatchModel from './WatchModel';
import WatchLighting from './WatchLighting';
import WatchControls from './WatchControls';
import WatchEnvironment from './WatchEnvironment';
import Loader from '../ui/Loader';
import ErrorBoundary from '../ui/ErrorBoundary';

/**
 * 3D R3F Canvas Container Component Architecture
 */
export const WatchScene = ({
  color = '#121214',
  strap = 'silicone-black',
  autoRotate = false,
  className = 'w-full h-[400px]',
}) => {
  return (
    <div className={`relative ${className}`}>
      <ErrorBoundary fallback={<div className="flex items-center justify-center h-full text-zinc-500 text-sm">3D Scene Loading Error</div>}>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <WatchLighting />
            <WatchModel color={color} strap={strap} />
            <WatchEnvironment />
            <WatchControls autoRotate={autoRotate} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default WatchScene;
