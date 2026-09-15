import React from 'react';

export const Loader = ({ label = 'Loading 3D Smartwatch Experience...', size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className={`rounded-full border-t-white border-zinc-800 animate-spin ${sizes[size] || sizes.md}`}></div>
      {label && <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono">{label}</p>}
    </div>
  );
};

export default Loader;
