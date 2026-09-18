import React from 'react';

export const Loader = ({ label = 'Loading CHRONOS Experience...', size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-14 h-14 border-3',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-8 text-center space-y-4"
    >
      <div className="relative flex items-center justify-center">
        <div className={`rounded-full border-amber-400/20 animate-ping absolute inset-0 ${sizes[size] || sizes.md}`} />
        <div
          className={`rounded-full border-amber-400 border-t-transparent animate-spin ${
            sizes[size] || sizes.md
          }`}
        />
      </div>
      {label && (
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono font-semibold">
          {label}
        </p>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
