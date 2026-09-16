import React, { useRef, useMemo, useEffect, useState, Component } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Internal Error Boundary for GLB Model Loading
 */
class GLBErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('GLB Smartwatch model not available, falling back to procedural 3D model:', error?.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * GLB Smartwatch Model Loader (Drei useGLTF)
 * Target asset path: /models/smartwatch.glb
 */
const GLBWatchModel = ({ url = '/models/chronos-watch.glb', color = '#121214', strap = 'silicone-black', ...props }) => {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!clonedScene) return;
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || '').toLowerCase();
        if (name.includes('case') || name.includes('body') || name.includes('chassis')) {
          if (child.material) {
            child.material = child.material.clone();
            child.material.color = new THREE.Color(color);
            child.material.roughness = 0.25;
            child.material.metalness = 0.85;
          }
        } else if (name.includes('strap') || name.includes('band') || name.includes('loop')) {
          if (child.material) {
            child.material = child.material.clone();
            const strapColor = strap.includes('leather')
              ? '#5c2c16'
              : strap.includes('titanium')
              ? '#3f3f46'
              : strap.includes('ocean')
              ? '#0284c7'
              : '#18181b';
            child.material.color = new THREE.Color(strapColor);
          }
        }
      }
    });
  }, [clonedScene, color, strap]);

  return <primitive object={clonedScene} {...props} />;
};

/**
 * High-Precision Procedural 3D Smartwatch Geometry Architecture
 */
const ProceduralWatchModel = ({ color = '#121214', strap = 'silicone-black' }) => {
  const getStrapColor = () => {
    if (strap.includes('leather')) return '#5c2c16';
    if (strap.includes('titanium')) return '#3f3f46';
    if (strap.includes('ocean')) return '#0284c7';
    return '#18181b';
  };

  return (
    <group>
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
  );
};

/**
 * Master 3D Smartwatch Model Component
 * Manages idle wave animation, scale, and GLB loading with seamless procedural fallback.
 */
export const WatchModel = ({
  color = '#121214',
  strap = 'silicone-black',
  enableMouseInteraction = true,
  rotationYOffset = 0,
  rotationXOffset = 0,
  scale = 1,
  modelUrl = '/models/chronos-watch.glb',
  ...props
}) => {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle idle floating wave oscillation
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;

    if (enableMouseInteraction) {
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

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props} dispose={null}>
      <group ref={innerRef}>
        <GLBErrorBoundary fallback={<ProceduralWatchModel color={color} strap={strap} />}>
          <GLBWatchModel url={modelUrl} color={color} strap={strap} />
        </GLBErrorBoundary>
      </group>
    </group>
  );
};

export default WatchModel;
