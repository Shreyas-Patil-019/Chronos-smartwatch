import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Smartwatch Model Component Architecture
 * Enhanced precision geometry with damped mouse physics & GLB ready drop-in architecture.
 */
export const WatchModel = ({
  color = '#121214',
  strap = 'silicone-black',
  enableMouseInteraction = true,
  rotationYOffset = 0,
  rotationXOffset = 0,
  scale = 1,
  ...props
}) => {
  const groupRef = useRef();
  const innerRef = useRef();

  // Damped cursor tracking physics & floating idle oscillation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Idle floating wave oscillation
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;

    if (enableMouseInteraction) {
      // Damped mouse rotation (lerp target based on state.pointer [-1..1])
      const targetY = state.pointer.x * 0.4 + rotationYOffset;
      const targetX = -state.pointer.y * 0.25 + rotationXOffset;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        delta * 3
      );
    } else {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (innerRef.current) {
      innerRef.current.rotation.z = Math.sin(time * 0.8) * 0.03;
    }
  });

  const getStrapColor = () => {
    if (strap.includes('leather')) return '#5c2c16';
    if (strap.includes('titanium')) return '#3f3f46';
    if (strap.includes('ocean')) return '#0284c7';
    return '#18181b';
  };

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props} dispose={null}>
      <group ref={innerRef}>
        {/* Main Titanium Chassis Enclosure */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.42, 64]} />
          <meshStandardMaterial
            color={color}
            roughness={0.25}
            metalness={0.85}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Chamfered Outer Bezel Ring */}
        <mesh position={[0, 0.21, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.52, 1.48, 0.05, 64]} />
          <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* AMOLED Screen Glass Face */}
        <mesh position={[0, 0.23, 0]} castShadow>
          <cylinderGeometry args={[1.38, 1.38, 0.02, 64]} />
          <meshPhysicalMaterial
            color="#09090b"
            roughness={0.08}
            metalness={0.15}
            transmission={0.4}
            thickness={0.6}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Active UI Watch Face Screen Dial Glow */}
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.2, 2.2]} />
          <meshBasicMaterial color="#d4af37" opacity={0.12} transparent />
        </mesh>

        {/* Tactical Crown Dial (Right side) */}
        <group position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.32, 32]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Quick Action Side Button */}
        <mesh position={[1.52, 0, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <boxGeometry args={[0.18, 0.25, 0.4]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Sensor Housing Base (Underneath) */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.08, 32]} />
          <meshStandardMaterial color="#09090b" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Top Ergonomic Strap */}
        <group position={[0, 0.15, 1.95]} rotation={[0.22, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 0.16, 1.7]} />
            <meshStandardMaterial color={getStrapColor()} roughness={0.7} metalness={0.1} />
          </mesh>
        </group>

        {/* Bottom Ergonomic Strap */}
        <group position={[0, 0.15, -1.95]} rotation={[-0.22, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 0.16, 1.7]} />
            <meshStandardMaterial color={getStrapColor()} roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default WatchModel;
