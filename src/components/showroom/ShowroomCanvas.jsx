import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import WatchModel from '../three/WatchModel';
import WatchLighting from '../three/WatchLighting';
import WatchEnvironment from '../three/WatchEnvironment';
import ErrorBoundary from '../ui/ErrorBoundary';

/**
 * 3D Showroom Canvas — Continuously animates 3D watch position, rotation, scale & camera based on scrollProgress
 */
const AnimatedShowroomScene = ({ scrollProgressRef, dpr }) => {
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    const progress = scrollProgressRef.current || 0;
    const time = state.clock.getElapsedTime();

    // Scene keyframe interpolation targets based on scrollProgress (0 to 1)
    let targetX = 0;
    let targetY = Math.sin(time * 1.2) * 0.06; // subtle idle float
    let targetZ = 0;

    let targetRotX = 0.2;
    let targetRotY = progress * Math.PI * 4 + 0.3; // Continuous 360 rotation driven by scroll
    let targetRotZ = 0;

    let targetScale = 1.0;

    if (progress < 0.14) {
      // Scene 01 — Arrival
      targetX = 0;
      targetRotX = 0.2;
      targetScale = 1.0;
    } else if (progress < 0.28) {
      // Scene 02 — The Silhouette (moves right, zooms)
      const p = (progress - 0.14) / 0.14;
      targetX = THREE.MathUtils.lerp(0, 0.7, p);
      targetRotX = THREE.MathUtils.lerp(0.2, 0.4, p);
      targetScale = THREE.MathUtils.lerp(1.0, 1.25, p);
    } else if (progress < 0.42) {
      // Scene 03 — The Display (face-on towards camera)
      const p = (progress - 0.28) / 0.14;
      targetX = THREE.MathUtils.lerp(0.7, 0, p);
      targetRotX = THREE.MathUtils.lerp(0.4, Math.PI / 2.2, p);
      targetRotY = THREE.MathUtils.lerp(0.3 + 0.28 * Math.PI * 4, Math.PI * 2, p);
      targetScale = THREE.MathUtils.lerp(1.25, 1.45, p);
    } else if (progress < 0.57) {
      // Scene 04 — Precision (side profile for crown/sensors)
      const p = (progress - 0.42) / 0.15;
      targetX = THREE.MathUtils.lerp(0, -0.7, p);
      targetRotX = THREE.MathUtils.lerp(Math.PI / 2.2, 0.1, p);
      targetRotY = THREE.MathUtils.lerp(Math.PI * 2, Math.PI * 2.5, p);
      targetScale = THREE.MathUtils.lerp(1.45, 1.2, p);
    } else if (progress < 0.71) {
      // Scene 05 — Built for Life (dynamic lifestyle angle)
      const p = (progress - 0.57) / 0.14;
      targetX = THREE.MathUtils.lerp(-0.7, 0.6, p);
      targetRotX = THREE.MathUtils.lerp(0.1, -0.3, p);
      targetRotY = THREE.MathUtils.lerp(Math.PI * 2.5, Math.PI * 3.2, p);
      targetScale = THREE.MathUtils.lerp(1.2, 1.15, p);
    } else if (progress < 0.85) {
      // Scene 06 — The Product (centered full showcase)
      const p = (progress - 0.71) / 0.14;
      targetX = THREE.MathUtils.lerp(0.6, 0, p);
      targetRotX = THREE.MathUtils.lerp(-0.3, 0.25, p);
      targetRotY = THREE.MathUtils.lerp(Math.PI * 3.2, Math.PI * 4, p);
      targetScale = THREE.MathUtils.lerp(1.15, 1.3, p);
    } else {
      // Scene 07 — Final Moment
      const p = (progress - 0.85) / 0.15;
      targetX = 0;
      targetRotX = 0.2;
      targetRotY = Math.PI * 4 + p * 0.8 + time * 0.1;
      targetScale = THREE.MathUtils.lerp(1.3, 1.1, p);
    }

    // Add subtle damped mouse offset on top
    const pointerX = state.pointer.x * 0.25;
    const pointerY = -state.pointer.y * 0.15;

    // Smooth lerp transforms (prevents stutter)
    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetX, delta * 4);
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetY, delta * 4);
    modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, targetZ, delta * 4);

    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX + pointerY, delta * 4);
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY + pointerX, delta * 4);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, targetRotZ, delta * 4);

    modelRef.current.scale.x = THREE.MathUtils.lerp(modelRef.current.scale.x, targetScale, delta * 4);
    modelRef.current.scale.y = THREE.MathUtils.lerp(modelRef.current.scale.y, targetScale, delta * 4);
    modelRef.current.scale.z = THREE.MathUtils.lerp(modelRef.current.scale.z, targetScale, delta * 4);
  });

  return (
    <>
      <WatchLighting />
      <group ref={modelRef}>
        <WatchModel color="#121214" strap="silicone-black" enableMouseInteraction={false} />
      </group>
      <WatchEnvironment />
    </>
  );
};

export const ShowroomCanvas = ({ scrollProgressRef, dpr = 1.5 }) => {
  return (
    <div className="w-full h-full relative">
      <ErrorBoundary fallback={<div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">3D Canvas Unavailable</div>}>
        <Canvas
          camera={{ position: [0, 1.6, 5.0], fov: 42 }}
          dpr={dpr}
          shadows={false}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <AnimatedShowroomScene scrollProgressRef={scrollProgressRef} dpr={dpr} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ShowroomCanvas;
