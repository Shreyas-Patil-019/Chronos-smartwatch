import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-start space-y-3">
      {Icon && (
        <div className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50 text-white">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-lg font-semibold text-white tracking-tight">{title}</h4>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
