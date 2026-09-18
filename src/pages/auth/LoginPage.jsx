import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Watch, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

export const LoginPage = () => {
  const { login, isLoading, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Collector Sign In',
    description: 'Sign in to access your CHRONOS precision timepiece portfolio, saved configurations, and concierge benefits.',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearAuthError();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setValidationError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setValidationError('Please enter your password.');
      return;
    }

    try {
      await login(cleanEmail, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const activeError = validationError || authError;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex items-center justify-center px-4 py-28 overflow-x-hidden">
      {/* Background Soft Studio Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl backdrop-blur-xl">
          {/* Header & Brand Icon */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center shadow-inner">
              <Watch className="w-6 h-6 text-amber-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                CHRONOS ACCOUNT ACCESS
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
              WELCOME <span className="text-gradient-gold">BACK.</span>
            </h1>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Sign in to manage your precision timepiece portfolio, saved configurations, and concierge benefits.
            </p>
          </div>

          {/* Validation / Auth Error Banner */}
          {activeError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-400 font-mono"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{activeError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationError('');
                }}
                autoComplete="email"
                required
                placeholder="client@chronos.luxury"
                className="w-full px-4 py-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
              />
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationError('');
                  }}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={isLoading}
              style={{ color: '#000000', backgroundColor: '#d4af37' }}
              className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
            >
              {isLoading ? (
                <span style={{ color: '#000000', fontWeight: 800 }}>Authenticating Session...</span>
              ) : (
                <>
                  <span style={{ color: '#000000', fontWeight: 800 }}>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                </>
              )}
            </Button>
          </form>

          {/* Footer & Registration Link */}
          <div className="pt-4 border-t border-zinc-900 text-center space-y-4">
            <p className="text-xs text-zinc-400 font-sans">
              Don't have a CHRONOS account?{' '}
              <Link
                to="/register"
                className="font-mono text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider ml-1 underline underline-offset-4 decoration-amber-400/50 hover:decoration-amber-400"
                style={{ color: '#fbbf24' }}
              >
                Create Account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400/60" />
              <span>Encrypted 256-Bit Authentication</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
