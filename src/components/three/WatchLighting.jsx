import React from 'react';

/**
 * Luxury Studio Lighting Architecture for CHRONOS 3D Smartwatch Showcase
 */
export const WatchLighting = () => {
  return (
    <>
      {/* Balanced Studio Ambient Fill */}
      <ambientLight intensity={0.5} />

      {/* Hemisphere Studio Gradient (Soft sky & ground fill for continuous 360° visibility) */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#475569"
        intensity={0.35}
      />

      {/* Key Studio Light (Defines form and chamfer highlights) */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={0.95}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill Studio Light (Softens contrast and reveals shadow details) */}
      <directionalLight
        position={[-4, 2, 3]}
        intensity={0.6}
        color="#f8fafc"
      />

      {/* Overhead & Rear Rim Light (Accents silhouette and crown profile) */}
      <directionalLight
        position={[0, 5, -4]}
        intensity={0.45}
        color="#ffffff"
      />

      {/* Dedicated Front Face Soft Fill (Ensures dial & bezel clarity from camera angle) */}
      <directionalLight
        position={[0, 1, 6]}
        intensity={0.5}
        color="#ffffff"
      />
    </>
  );
};

export default WatchLighting;
