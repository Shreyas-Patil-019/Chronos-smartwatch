import React from 'react';

/**
 * Luxury Studio Lighting Architecture for CHRONOS 3D Smartwatch Showcase
 */
export const WatchLighting = () => {
  return (
    <>
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.7} />

      {/* Key Directional Light (Top-Right Warm Studio Light) */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cool Rim Edge Light (Left Rear Edge Sheen) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={1.2}
        color="#38bdf8"
      />

      {/* Gold Under-Glow Point Light */}
      <pointLight
        position={[0, -3, 3]}
        intensity={0.9}
        color="#fbbf24"
        distance={8}
      />

      {/* Front Face Soft Fill */}
      <directionalLight
        position={[0, 2, 8]}
        intensity={0.4}
        color="#ffffff"
      />
    </>
  );
};

export default WatchLighting;
