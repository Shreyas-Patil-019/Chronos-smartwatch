import React from 'react';
import WatchScene from '../three/WatchScene';

export const ProductViewer = ({ color, strap, className = 'h-[450px]' }) => {
  return (
    <div className={`relative w-full rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 overflow-hidden ${className}`}>
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-zinc-800/80 border border-zinc-700/60 rounded-full text-[10px] font-mono uppercase tracking-widest text-zinc-300">
        3D Real-Time Render
      </div>
      <WatchScene color={color} strap={strap} autoRotate={false} className="w-full h-full" />
    </div>
  );
};

export default ProductViewer;
