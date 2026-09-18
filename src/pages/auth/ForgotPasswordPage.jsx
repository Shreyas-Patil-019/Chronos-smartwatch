import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { KeyRound, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import usePageSEO from '../../hooks/usePageSEO';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

export const ForgotPasswordPage = () => {
  const { requestPasswordReset, isLoading, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Account Credential Recovery',
    description: 'Enter your registered CHRONOS email address to receive password reset authentication instructions.',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearAuthError();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setValidationError('Please enter your registered email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    try {
      const res = await requestPasswordReset(cleanEmail);
      setSuccessInfo(res.message || `Password reset instructions have been prepared for ${cleanEmail}.`);
    } catch (err) {
      // Handled in AuthContext
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
              <KeyRound className="w-6 h-6 text-amber-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                CREDENTIAL RECOVERY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
              RESET <span className="text-gradient-gold">PASSWORD.</span>
            </h1>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Enter your registered CHRONOS email address to receive password reset authentication instructions.
            </p>
          </div>

          {/* Success Banner */}
          {successInfo ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-3 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Reset Instructions Sent
                </h4>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {successInfo}
                </p>
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button
                    variant="gold"
                    size="md"
                    className="w-full font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
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
                <div className="space-y-1.5">
                  <label
                    htmlFor="reset-email"
                    className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold"
                  >
                    Registered Email Address
                  </label>
                  <input
                    id="reset-email"
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

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={isLoading}
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                >
                  {isLoading ? (
                    <span style={{ color: '#000000', fontWeight: 800 }}>Dispatching Instructions...</span>
                  ) : (
                    <>
                      <span style={{ color: '#000000', fontWeight: 800 }}>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Footer & Back to Login */}
          <div className="pt-4 border-t border-zinc-900 text-center space-y-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400/60" />
              <span>CHRONOS End-to-End Encryption</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
