import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Watch, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

export const RegisterPage = () => {
  const { register, isLoading, authError, clearAuthError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Join the Collective (Create Account)',
    description: 'Join the CHRONOS collective to unlock personalized 3D timepiece configurations, priority allocations, and concierge services.',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearAuthError();

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || cleanName.length < 2) {
      setValidationError('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!cleanEmail) {
      setValidationError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setValidationError('Please enter a password.');
      return;
    }

    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match. Please verify both fields.');
      return;
    }

    try {
      await register(cleanName, cleanEmail, password);
      navigate('/account', { replace: true });
    } catch {
      // Error handled in AuthContext
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
                EXCLUSIVE MEMBERSHIP
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
              CREATE <span className="text-gradient-gold">ACCOUNT.</span>
            </h1>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Join the CHRONOS collective to unlock personalized 3D timepiece configurations and priority concierge services.
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-name"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidationError('');
                }}
                autoComplete="name"
                required
                placeholder="Alexander Vance"
                className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-email"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
              >
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationError('');
                }}
                autoComplete="email"
                required
                placeholder="client@chronos.luxury"
                className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-password"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
              >
                Password <span className="text-[10px] text-zinc-500 font-normal">(8+ characters)</span>
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationError('');
                  }}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
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

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setValidationError('');
                  }}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isLoading}
                style={{ color: '#000000', backgroundColor: '#d4af37' }}
                className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
              >
                {isLoading ? (
                  <span style={{ color: '#000000', fontWeight: 800 }}>Creating Account...</span>
                ) : (
                  <>
                    <span style={{ color: '#000000', fontWeight: 800 }}>Create Account</span>
                    <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer & Login Link */}
          <div className="pt-4 border-t border-zinc-900 text-center space-y-4">
            <p className="text-xs text-zinc-400 font-sans">
              Already have a CHRONOS account?{' '}
              <Link
                to="/login"
                className="font-mono text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider ml-1 underline underline-offset-4 decoration-amber-400/50 hover:decoration-amber-400"
                style={{ color: '#fbbf24' }}
              >
                Sign In
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400/60" />
              <span>Protected by CHRONOS Security Protocol</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
