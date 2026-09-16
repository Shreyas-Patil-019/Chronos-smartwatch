import React, { forwardRef } from 'react';
import { OrbitControls } from '@react-three/drei';

/**
 * Phase 4 Full 360° Interactive Orbit & Touch Controls Component
 * Provides smooth 360-degree horizontal rotation, vertical angle inspection,
 * touch support, and bounded zoom controls without page-scroll hijacking.
 */
export const WatchControls = forwardRef(({
  enableZoom = true,
  autoRotate = false,
  autoRotateSpeed = 1.5,
  minDistance = 2.8,
  maxDistance = 8.0,
  rotateSpeed = 0.85,
  zoomSpeed = 0.85,
}, ref) => {
  return (
    <OrbitControls
      ref={ref}
      enableZoom={enableZoom}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minDistance={minDistance}
      maxDistance={maxDistance}
      /* Allow inspection of top face, front, sides, rear and bottom sensor */
      minPolarAngle={Math.PI * 0.05}
      maxPolarAngle={Math.PI * 0.95}
      /* Full unlimited 360° horizontal rotation (no min/max azimuth bounds) */
      rotateSpeed={rotateSpeed}
      zoomSpeed={zoomSpeed}
      dampingFactor={0.06}
      enableDamping={true}
    />
  );
});

WatchControls.displayName = 'WatchControls';

export default WatchControls;
