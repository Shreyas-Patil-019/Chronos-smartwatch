import React, { useEffect, useState } from 'react';

export const DynamicBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Damped target normalized coordinates [0..1]
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-zinc-950">
      {/* Primary Radial Soft Glow linked smoothly to cursor */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out opacity-40"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212, 175, 55, 0.08), rgba(59, 130, 246, 0.04), transparent 70%)`,
        }}
      />

      {/* Atmospheric Depth Bloom (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-amber-500/5 via-blue-900/5 to-transparent blur-3xl opacity-60 rounded-full" />

      {/* Atmospheric Depth Bloom (Center Floor) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-t from-zinc-900/80 via-zinc-950/40 to-transparent blur-2xl" />

      {/* Subtle Noise / Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DynamicBackground;
