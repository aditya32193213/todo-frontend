import { Component } from "react";

/* ─── keyframes injected once per page ─────────────────────────────────────── */
const CSS = `
  @keyframes eb-ring-1 {
    0%, 100% { transform: scale(1);    opacity: 0.55; }
    50%       { transform: scale(1.22); opacity: 0;    }
  }
  @keyframes eb-ring-2 {
    0%, 100% { transform: scale(1);    opacity: 0.35; }
    50%       { transform: scale(1.38); opacity: 0;    }
  }
  @keyframes eb-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes eb-icon-in {
    from { opacity: 0; transform: scale(0.7) rotate(-6deg); }
    to   { opacity: 1; transform: scale(1)   rotate(0deg);  }
  }
  .eb-ring-1 { animation: eb-ring-1 2.6s ease-in-out infinite; }
  .eb-ring-2 { animation: eb-ring-2 2.6s 0.5s ease-in-out infinite; }
  .eb-icon   { animation: eb-icon-in  0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
  .eb-text   { animation: eb-fade-up  0.45s 0.12s ease both; }
  .eb-debug  { animation: eb-fade-up  0.45s 0.22s ease both; }
  .eb-btns   { animation: eb-fade-up  0.45s 0.32s ease both; }
`;

let stylesInjected = false;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
    /* Inject styles once into <head> — idempotent */
    if (!stylesInjected && typeof document !== "undefined") {
      const tag = document.createElement("style");
      tag.textContent = CSS;
      document.head.appendChild(tag);
      stylesInjected = true;
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ componentStack: info.componentStack });
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary] Caught render error:", error, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, componentStack: null });
    if (this.props.onReset) this.props.onReset();
    else window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-7
                      bg-slate-50 dark:bg-night-900 p-6 relative"
           style={{ isolation: "isolate" }}>

        {/* ── Animated icon ─────────────────────────────────────── */}
        <div className="eb-icon relative flex items-center justify-center w-24 h-24">

          {/* Outer pulse ring */}
          <div className="eb-ring-2 absolute inset-0 rounded-full
                          bg-red-400/20 dark:bg-red-500/15" />

          {/* Inner pulse ring */}
          <div className="eb-ring-1 absolute w-[68px] h-[68px] rounded-full
                          bg-red-400/25 dark:bg-red-500/20" />

          {/* Icon card */}
          <div className="relative z-10 w-[54px] h-[54px] rounded-2xl
                          bg-white dark:bg-slate-900
                          border border-red-100 dark:border-red-900/50
                          shadow-[0_0_0_1px_rgba(239,68,68,0.07),0_8px_24px_-4px_rgba(239,68,68,0.18),0_2px_8px_rgba(239,68,68,0.1)]
                          flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.1"
                 strokeLinecap="round" strokeLinejoin="round"
                 className="text-red-500">
              <circle cx="12" cy="12" r="9.5" />
              <line x1="12" y1="8"   x2="12"   y2="12.2" />
              <circle cx="12" cy="16" r="0.6" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>

        {/* ── Headline & sub ────────────────────────────────────── */}
        <div className="eb-text text-center max-w-[22rem] space-y-2.5">
          <h2 className="text-[1.35rem] font-display font-bold
                         text-slate-800 dark:text-white tracking-tight">
            Something went wrong
          </h2>
          <p className="text-sm font-body text-slate-500 dark:text-slate-400 leading-relaxed">
            An unexpected error occurred. Your data is safe —{" "}
            refreshing the page should resolve this.
          </p>
        </div>

        {/* ── Dev debug panel ───────────────────────────────────── */}
        {process.env.NODE_ENV !== "production" && this.state.error && (
          <div className="eb-debug w-full max-w-sm">
            {/* Divider label */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent
                              via-slate-200 dark:via-slate-700 to-transparent" />
              <span className="text-[10px] font-mono font-bold tracking-[0.15em]
                               text-slate-400 dark:text-slate-500 uppercase shrink-0">
                debug info
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent
                              via-slate-200 dark:via-slate-700 to-transparent" />
            </div>

            {/* Error block */}
            <div className="rounded-xl overflow-hidden
                            border border-red-100 dark:border-red-900/30
                            bg-red-50/60 dark:bg-red-950/20 backdrop-blur-sm">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-3.5 py-2
                              border-b border-red-100 dark:border-red-900/30
                              bg-red-50 dark:bg-red-950/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="text-[10px] font-mono font-semibold
                                 text-red-500 dark:text-red-400 tracking-wide uppercase">
                  {this.state.error.name || "Error"}
                </span>
              </div>
              {/* Stack content */}
              <pre className="p-3.5 text-[11px] font-mono leading-relaxed
                              text-red-600 dark:text-red-400
                              overflow-y-auto h-44 whitespace-pre-wrap break-words
                              cursor-text select-text">
                {this.state.error.message}
                {this.state.componentStack &&
                  `\n\nComponent stack:${this.state.componentStack}`}
              </pre>
            </div>
          </div>
        )}

        {/* ── Actions ───────────────────────────────────────────── */}
        <div className="eb-btns flex items-center gap-3 relative z-50">
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="px-5 py-2.5 rounded-xl text-sm font-display font-semibold
                       text-slate-600 dark:text-slate-300
                       bg-white dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700
                       hover:bg-slate-50 dark:hover:bg-slate-700
                       hover:border-slate-300 dark:hover:border-slate-600
                       transition-all duration-200 cursor-pointer
                       relative z-50 select-none"
          >
            Reload page
          </button>
          <button
            onClick={this.handleReset}
            type="button"
            className="px-5 py-2.5 rounded-xl text-sm font-display font-semibold
                       text-white
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-500 hover:to-indigo-500
                       shadow-lg shadow-violet-500/25
                       transition-all duration-200 cursor-pointer
                       relative z-50 select-none"
          >
            Go to home
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;