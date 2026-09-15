import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl text-white text-sm">
      {icons[type]}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
