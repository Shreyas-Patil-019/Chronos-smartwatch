import React, { useRef, useMemo, useEffect, Component } from 'react';
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
 * Target asset path: /models/chronos-watch.glb
 * Dynamically applies the chosen color to both Case and Strap materials and geometries.
 */
const GLBWatchModel = ({ url = '/models/chronos-watch.glb', color = '#121214', ...props }) => {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!clonedScene) return;
    
    // Process target color with linear floor to prevent crushing dark finishes into pure black void
    const baseCol = new THREE.Color(color);
    const lum = 0.2126 * baseCol.r + 0.7152 * baseCol.g + 0.0722 * baseCol.b;
    const isBlackModel = lum < 0.05;

    // For dark finishes (e.g. Space Black #121214, Stealth Black #0a0a0c), lift linear floor slightly
    // so surfaces, chamfers, and buttons retain visible curvature and form under ACESFilmic tone mapping
    const targetColor = baseCol.clone();
    if (isBlackModel) {
      targetColor.r = Math.max(targetColor.r, 0.035);
      targetColor.g = Math.max(targetColor.g, 0.035);
      targetColor.b = Math.max(targetColor.b, 0.038);
    }

    // Dynamic PBR response:
    // Metalness: 0.76 provides true metallic conductivity while allowing ~24% diffuse reflectance
    // so the base color remains clearly visible in all lighting conditions and from all 360° angles.
    // Roughness: 0.32 gives a luxury brushed/satin titanium sheen with soft highlights.
    // EnvMapIntensity: scaled gracefully so reflections complement rather than overpower the base color.
    const caseEnvMapIntensity = Math.min(0.8, Math.max(0.3, 0.3 + 0.5 * Math.pow(lum, 0.7)));
    const caseRoughness = 0.28 + 0.08 * (1.0 - Math.min(1.0, Math.pow(lum, 0.5)));
    const caseMetalness = 0.76;

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const nodeName = (child.name || '').toLowerCase();
        const parentName = (child.parent?.name || '').toLowerCase();

        const updateMat = (mat) => {
          if (!mat) return;
          const matName = (mat.name || '').toLowerCase();

          const isScreen =
            matName === 'screen' ||
            matName.includes('screen') ||
            matName.includes('display') ||
            matName.includes('dial') ||
            nodeName.includes('screen') ||
            nodeName.includes('display') ||
            nodeName.includes('dial');

          const isStrap =
            !isScreen && (
              matName === 'strap' ||
              matName.includes('strap') ||
              matName.includes('band') ||
              matName.includes('wrist') ||
              nodeName.includes('strap') ||
              nodeName.includes('band') ||
              nodeName.includes('loop') ||
              nodeName.includes('wrist') ||
              parentName.includes('strap') ||
              parentName.includes('band') ||
              parentName.includes('loop') ||
              parentName.includes('wrist')
            );

          const isCase =
            !isScreen && (
              matName === 'case' ||
              matName.includes('case') ||
              matName.includes('titanium') ||
              matName.includes('metal') ||
              matName.includes('bezel') ||
              nodeName.includes('case') ||
              nodeName.includes('body') ||
              nodeName.includes('chassis') ||
              nodeName.includes('lug') ||
              nodeName.includes('crown') ||
              nodeName.includes('bezel') ||
              nodeName.includes('buckle') ||
              parentName.includes('case') ||
              parentName.includes('body') ||
              parentName.includes('chassis') ||
              parentName.includes('lug') ||
              parentName.includes('crown') ||
              parentName.includes('bezel') ||
              parentName.includes('buckle')
            );

          if (isScreen) {
            // SCREEN ONLY:
            // For the BLACK model: Make screen content/numbers/text/icons BRIGHT WHITE against the dark OLED background
            if (isBlackModel) {
              mat.color = new THREE.Color('#ffffff');
              mat.emissive = new THREE.Color('#ffffff');
              if (mat.map) {
                mat.emissiveMap = mat.map;
              }
              mat.emissiveIntensity = 1.2;
              mat.roughness = 0.12;
              mat.metalness = 0.0;
              mat.customProgramCacheKey = () => 'black_screen_white_text';
              mat.onBeforeCompile = (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                  '#include <map_fragment>',
                  `#include <map_fragment>
                  #ifdef USE_MAP
                    float maxChan = max(sampledDiffuseColor.r, max(sampledDiffuseColor.g, sampledDiffuseColor.b));
                    if (maxChan > 0.06) {
                      float f = smoothstep(0.04, 0.20, maxChan);
                      diffuseColor.rgb = mix(vec3(0.008), vec3(1.0), f);
                    } else {
                      diffuseColor.rgb = vec3(0.008, 0.008, 0.01);
                    }
                  #endif`
                );
                shader.fragmentShader = shader.fragmentShader.replace(
                  '#include <emissivemap_fragment>',
                  `#include <emissivemap_fragment>
                  #ifdef USE_EMISSIVEMAP
                    float emMax = max(totalEmissiveRadiance.r, max(totalEmissiveRadiance.g, totalEmissiveRadiance.b));
                    if (emMax > 0.06) {
                      float ef = smoothstep(0.04, 0.20, emMax);
                      totalEmissiveRadiance = mix(vec3(0.0), vec3(1.2), ef);
                    } else {
                      totalEmissiveRadiance = vec3(0.0);
                    }
                  #endif`
                );
              };
            } else {
              // For all other colors: preserve standard original colorful screen appearance
              mat.color = new THREE.Color('#ffffff');
              mat.emissive = new THREE.Color(0x000000);
              mat.emissiveIntensity = 0;
              mat.roughness = 0.15;
              mat.metalness = 0.0;
              mat.customProgramCacheKey = () => 'standard_screen';
              mat.onBeforeCompile = () => {};
            }
            mat.needsUpdate = true;
          } else if (isStrap) {
            // STRAP ONLY:
            // For the BLACK model: Make wrist band a refined dark charcoal/slate gray (#38383e)
            // For all other models: faithfully match the chosen swatch color
            const strapColor = isBlackModel ? new THREE.Color('#38383e') : baseCol;
            mat.color.copy(strapColor);
            mat.roughness = 0.68;
            mat.metalness = 0.06;
            mat.envMapIntensity = 0.35;
            mat.emissive = new THREE.Color(0x000000);
            mat.emissiveIntensity = 0;
            mat.needsUpdate = true;
          } else if (isCase) {
            mat.color.copy(targetColor);
            mat.roughness = caseRoughness;
            mat.metalness = caseMetalness;
            mat.envMapIntensity = caseEnvMapIntensity;
            mat.emissive = new THREE.Color(0x000000);
            mat.emissiveIntensity = 0;
            mat.needsUpdate = true;
          }
        };

        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => m.clone());
          child.material.forEach(updateMat);
        } else {
          child.material = child.material.clone();
          updateMat(child.material);
        }
      }
    });
  }, [clonedScene, color]);

  return <primitive object={clonedScene} {...props} />;
};

/**
 * High-Precision Procedural 3D Smartwatch Geometry Architecture
 * Accurately reflects user selected color on metallic body and matching strap.
 * Optimized geometry segment counts for 60fps rendering on low-end hardware.
 */
const ProceduralWatchModel = ({ color = '#121214' }) => {
  const baseCol = useMemo(() => new THREE.Color(color), [color]);
  const lum = useMemo(() => 0.2126 * baseCol.r + 0.7152 * baseCol.g + 0.0722 * baseCol.b, [baseCol]);
  const isBlackModel = lum < 0.05;

  const targetColor = useMemo(() => {
    const c = baseCol.clone();
    if (isBlackModel) {
      c.r = Math.max(c.r, 0.035);
      c.g = Math.max(c.g, 0.035);
      c.b = Math.max(c.b, 0.038);
    }
    return c;
  }, [baseCol, isBlackModel]);

  const caseEnvMapIntensity = useMemo(() => Math.min(0.8, Math.max(0.3, 0.3 + 0.5 * Math.pow(lum, 0.7))), [lum]);
  const caseRoughness = useMemo(() => 0.28 + 0.08 * (1.0 - Math.min(1.0, Math.pow(lum, 0.5))), [lum]);

  const strapColor = useMemo(() => (isBlackModel ? new THREE.Color('#38383e') : baseCol), [isBlackModel, baseCol]);

  return (
    <group>
      {/* Main Titanium Chassis Enclosure */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.42, 36]} />
        <meshStandardMaterial
          color={targetColor}
          roughness={caseRoughness}
          metalness={0.76}
          envMapIntensity={caseEnvMapIntensity}
        />
      </mesh>

      {/* Chamfered Outer Bezel Ring Surrounding Screen */}
      <mesh position={[0, 0.21, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.52, 1.48, 0.05, 36]} />
        <meshStandardMaterial
          color={targetColor}
          roughness={caseRoughness}
          metalness={0.80}
          envMapIntensity={caseEnvMapIntensity}
        />
      </mesh>

      {/* AMOLED Screen Glass Face */}
      <mesh position={[0, 0.23, 0]} castShadow>
        <cylinderGeometry args={[1.38, 1.38, 0.02, 36]} />
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

      {/* Active UI Watch Face Screen Dial Glow — Bright White for Black Model Only */}
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          color={isBlackModel ? '#ffffff' : '#d4af37'}
          opacity={isBlackModel ? 0.35 : 0.15}
          transparent
        />
      </mesh>

      {/* Tactical Crown Dial (Right side) */}
      <group position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.32, 20]} />
          <meshStandardMaterial color={targetColor} roughness={0.25} metalness={0.88} envMapIntensity={caseEnvMapIntensity} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Quick Action Side Button */}
      <mesh position={[1.52, 0, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.18, 0.25, 0.4]} />
        <meshStandardMaterial color={targetColor} roughness={caseRoughness} metalness={0.78} envMapIntensity={caseEnvMapIntensity} />
      </mesh>

      {/* Sensor Housing Base (Underneath) */}
      <mesh position={[0, -0.22, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.08, 24]} />
        <meshStandardMaterial color="#09090b" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Top Ergonomic Strap — matches chosen color (grey on black model) */}
      <group position={[0, 0.15, 1.95]} rotation={[0.22, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.16, 1.7]} />
          <meshStandardMaterial color={strapColor} roughness={0.68} metalness={0.06} />
        </mesh>
      </group>

      {/* Bottom Ergonomic Strap — matches chosen color (grey on black model) */}
      <group position={[0, 0.15, -1.95]} rotation={[-0.22, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.16, 1.7]} />
          <meshStandardMaterial color={strapColor} roughness={0.68} metalness={0.06} />
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
    }

    if (innerRef.current) {
      innerRef.current.rotation.z = Math.sin(time * 0.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props} dispose={null}>
      <group ref={innerRef}>
        <GLBErrorBoundary fallback={<ProceduralWatchModel color={color} />}>
          <GLBWatchModel url={modelUrl} color={color} />
        </GLBErrorBoundary>
      </group>
    </group>
  );
};

export default WatchModel;
