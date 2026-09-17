import React from 'react';
import { ContactShadows } from '@react-three/drei';

/**
 * Backdrop & Ground Contact Shadow Studio Environment Architecture
 * Provides a realistic soft contact shadow and a subtle dark showroom pedestal
 * to ground the smartwatch physically without distracting glowing circles.
 * Optimized with static frame computation and lightweight ring geometry.
 */
export const WatchEnvironment = () => {
  return (
    <group>
      {/* Photorealistic Soft Contact Shadow beneath the watch (cached single-frame computation) */}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.7}
        scale={7}
        blur={2}
        far={3.5}
        resolution={512}
        frames={1}
        color="#000000"
      />

      {/* Subtle Studio Showroom Disc Surface */}
      <group position={[0, -1.08, 0]}>
        {/* Dark Matte Showroom Platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 2.4, 36]} />
          <meshStandardMaterial
            color="#09090b"
            roughness={0.85}
            metalness={0.15}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Delicate Outer Precision Boundary Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
          <ringGeometry args={[2.38, 2.41, 36]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.18} />
        </mesh>
      </group>
    </group>
  );
};

export default WatchEnvironment;
