import React, { useRef, useState, useEffect, useCallback } from 'react';
import ShowroomCanvas from './ShowroomCanvas';
import ShowroomOverlay from './ShowroomOverlay';
import ShowroomNavigation from './ShowroomNavigation';
import DynamicBackground from '../ui/DynamicBackground';

export const ScrollShowroom = () => {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // Device-aware DPR optimization for low-end hardware
    if (typeof window !== 'undefined') {
      const isLowEnd =
        window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      setDpr(isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1.5, 2));
    }

    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.clientHeight - window.innerHeight;

          if (totalScrollable > 0) {
            const rawProgress = -rect.top / totalScrollable;
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));

            // Mutate ref directly without triggering React re-render
            scrollProgressRef.current = clampedProgress;

            // Compute current scene index (0 through 6)
            let sceneIndex = 0;
            if (clampedProgress >= 0.85) sceneIndex = 6;
            else if (clampedProgress >= 0.71) sceneIndex = 5;
            else if (clampedProgress >= 0.57) sceneIndex = 4;
            else if (clampedProgress >= 0.42) sceneIndex = 3;
            else if (clampedProgress >= 0.28) sceneIndex = 2;
            else if (clampedProgress >= 0.14) sceneIndex = 1;

            // Only trigger state change when crossing scene boundaries
            setActiveScene((prev) => (prev !== sceneIndex ? sceneIndex : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = useCallback((sceneId) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;
    const sceneThresholds = [0, 0.2, 0.35, 0.5, 0.65, 0.78, 0.95];
    const targetScroll = containerRef.current.offsetTop + sceneThresholds[sceneId] * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  const scrollToNextScene = useCallback(() => {
    handleSelectScene(Math.min(activeScene + 1, 6));
  }, [activeScene, handleSelectScene]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-black">
      {/* Background Dynamic Ambient Light */}
      <DynamicBackground />

      {/* Sticky 100vh Showroom Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 3D R3F Model Canvas */}
        <ShowroomCanvas scrollProgressRef={scrollProgressRef} dpr={dpr} />

        {/* Synchronized HTML Text Overlays */}
        <ShowroomOverlay activeScene={activeScene} scrollToNextScene={scrollToNextScene} />

        {/* Vertical Scene Progress Dots */}
        <ShowroomNavigation activeScene={activeScene} onSelectScene={handleSelectScene} />
      </div>
    </div>
  );
};

export default ScrollShowroom;
