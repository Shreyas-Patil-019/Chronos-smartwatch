import React from 'react';

/**
 * Studio Lighting Setup for 3D Smartwatch Showcase
 */
export const WatchLighting = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -5, 2]} intensity={0.8} color="#d4af37" />
    </>
  );
};

export default WatchLighting;
