import React from 'react';
import usePageSEO from '../../hooks/usePageSEO';

export const PrivacyPage = () => {
  usePageSEO({
    title: 'CHRONOS — Privacy Protocol',
    description: 'Review the zero-knowledge biometric security and privacy safeguards protecting CHRONOS clients.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="glass-panel p-12 rounded-3xl border border-zinc-800 space-y-4 bg-zinc-950/80 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">Privacy Protocol</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          CHRONOS adheres to strict on-device biometric processing protocols. Single-lead ECG and SpO2 telemetry data are encrypted locally and never transmitted without explicit user authorization.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
