import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export const OrderSuccessPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="glass-panel p-10 rounded-3xl border border-zinc-800 space-y-4">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white">Order Confirmed!</h1>
        <p className="text-sm text-zinc-400">
          Order Success Page — Full receipt details coming in Phase 12
        </p>
        <Link to="/" className="inline-block pt-4">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
