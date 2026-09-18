import React, { Component } from 'react';
import { RefreshCw, Home, ShieldAlert, Sparkles } from 'lucide-react';
import Button from './Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error safely in console without exposing internal data to user UI
    if (process.env.NODE_ENV !== 'production') {
      console.error('CHRONOS ErrorBoundary caught an exception:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex items-center justify-center px-4 py-16">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-lg w-full bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl backdrop-blur-xl relative z-10">
            {/* Top Brand Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                CHRONOS LUXURY TIMEPIECES
              </span>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
                SOMETHING WENT WRONG
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                An unexpected condition occurred while loading this view. Your session and saved configurations remain safe.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={this.handleReset}
                style={{ color: '#000000', backgroundColor: '#d4af37' }}
                className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
              >
                <RefreshCw className="w-3.5 h-3.5 text-black" style={{ color: '#000000' }} />
                <span style={{ color: '#000000', fontWeight: 800 }}>Try Again</span>
              </Button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
