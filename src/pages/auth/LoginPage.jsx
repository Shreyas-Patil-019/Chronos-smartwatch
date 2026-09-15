import React from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-6">
        <h1 className="text-2xl font-bold text-white">Sign In to Chronos</h1>
        <p className="text-sm text-zinc-400">
          Login Page — Authentication system coming in Phase 10
        </p>
        <div className="pt-4 flex flex-col gap-3">
          <Link to="/register" className="text-xs text-amber-400 hover:underline">
            Don't have an account? Register
          </Link>
          <Link to="/forgot-password" className="text-xs text-zinc-500 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
