import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // FIX 8: store componentStack so it's available for error-reporting services
  // (e.g. Sentry.captureException) and available in the dev overlay below.
  // Previously componentDidCatch logged it but didn't persist it — it was lost
  // by the time the recovery UI rendered.
  componentDidCatch(error, info) {
    this.setState({ componentStack: info.componentStack });
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary] Caught render error:", error, info.componentStack);
    }
    // In production: Sentry.captureException(error, { extra: info })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, componentStack: null });
    // Prefer the onReset prop (soft React Router navigation, passed by
    // RouteErrorBoundary in App.jsx) over a hard page reload.
    if (this.props.onReset) this.props.onReset();
    else window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 page-bg p-6">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20
                        flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
               strokeLinejoin="round" className="text-red-500">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <div className="text-center max-w-sm">
          <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-2">
            An unexpected error occurred. Your data is safe — refreshing the page
            should fix this.
          </p>

          {process.env.NODE_ENV !== "production" && this.state.error && (
            <pre className="mt-4 text-left text-xs bg-slate-100 dark:bg-night-700
                            text-red-600 dark:text-red-400 rounded-xl p-3 overflow-auto
                            max-h-40 font-mono">
              {this.state.error.message}
              {this.state.componentStack && `\n\nComponent stack:${this.state.componentStack}`}
            </pre>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={() => window.location.reload()} className="btn-ghost">
            Reload page
          </button>
          <button onClick={this.handleReset} className="btn-primary">
            Go to home
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;