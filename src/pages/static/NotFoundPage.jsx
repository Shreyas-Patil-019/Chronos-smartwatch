import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="glass-panel p-10 rounded-3xl border border-zinc-800 space-y-4">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto font-mono text-xl font-bold">
          404
        </div>
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The page or product model you requested does not exist or has been relocated.
        </p>
        <Link to="/" className="inline-block pt-2">
          <Button variant="primary" size="md">
            Return to Chronos Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
