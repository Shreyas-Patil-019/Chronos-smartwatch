import React from 'react';
import { OrbitControls } from '@react-three/drei';

/**
 * Camera Orbit & Interactive Rotation Controls Architecture
 */
export const WatchControls = ({ enableZoom = true, autoRotate = false }) => {
  return (
    <OrbitControls
      enableZoom={enableZoom}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.7}
      dampingFactor={0.05}
      enableDamping={true}
    />
  );
};

export default WatchControls;
