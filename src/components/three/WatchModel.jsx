import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * 3D Smartwatch Model Component Architecture
 * Prepared to render procedural 3D smartwatch geometry in Phase 1,
 * and seamlessly swap with Blender GLB exported model when placed in /public/models/smartwatch.glb
 */
export const WatchModel = ({ color = '#121214', strap = 'silicone-black', ...props }) => {
  const groupRef = useRef();

  // Subtle rotation animation idle effect
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Watch Body Enclosure (Procedural 3D Mesh Architecture) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Screen Glass Face */}
      <mesh position={[0, 0.21, 0]} castShadow>
        <cylinderGeometry args={[1.35, 1.35, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#050508"
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Screen Bezel Ring */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <ringGeometry args={[1.35, 1.48, 64]} />
        <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Digital Crown Button */}
      <mesh position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Top Strap Attachment */}
      <mesh position={[0, 0.2, 1.8]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 1.4]} />
        <meshStandardMaterial color={strap.includes('leather') ? '#78350f' : '#18181b'} roughness={0.7} />
      </mesh>

      {/* Bottom Strap Attachment */}
      <mesh position={[0, 0.2, -1.8]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 1.4]} />
        <meshStandardMaterial color={strap.includes('leather') ? '#78350f' : '#18181b'} roughness={0.7} />
      </mesh>
    </group>
  );
};

export default WatchModel;
