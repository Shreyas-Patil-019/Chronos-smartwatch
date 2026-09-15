import React from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-6">
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-sm text-zinc-400">
          Forgot Password Page — Reset service coming in Phase 10
        </p>
        <div className="pt-4">
          <Link to="/login" className="text-xs text-amber-400 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
