import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
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
    console.error('CHRONOS ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-zinc-950 border border-zinc-800 rounded-3xl m-4">
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 mb-4">
            <AlertTriangle size={36} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Error</h2>
          <p className="text-zinc-400 text-sm max-w-md mb-6">
            An unexpected error occurred while rendering this component.
          </p>
          {this.state.error && (
            <pre className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-left text-xs font-mono text-rose-300 max-w-lg overflow-x-auto mb-6">
              {this.state.error.toString()}
            </pre>
          )}
          <Button variant="outline" onClick={this.handleReset} className="flex items-center gap-2">
            <RefreshCw size={16} />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
