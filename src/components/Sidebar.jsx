import { useMemo, memo, useCallback } from "react";
import { ListTodo, Zap, X, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "../features/tasks/taskConstants";

const EMPTY_METRICS = { total: 0, completed: 0, inProgress: 0, pending: 0, pct: 0 };

// FIX: wrapped in React.memo.
// Sidebar re-rendered on every Home.jsx state change (each search keystroke,
// every pagination click, every sort toggle) because it had no memo and its
// props were new arrow functions on every render. With memo + the useCallback
// wrappers added in Home.jsx, Sidebar now only re-renders when its props
// actually change (filter change, metrics update, sidebar open/close).
const Sidebar = memo(({
  isOpen,
  onClose,
  activeFilter,
  onFilterChange,
  metrics = EMPTY_METRICS,
  onSeed,
  seeding,
}) => {
  const handleNav = useCallback((id) => {
    onFilterChange(id);
    onClose();
  }, [onFilterChange, onClose]);

  const countMap = useMemo(() => ({
    all:           metrics.total,
    pending:       metrics.pending,
    "in-progress": metrics.inProgress,
    completed:     metrics.completed,
  }), [metrics.total, metrics.pending, metrics.inProgress, metrics.completed]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          w-64 flex flex-col
          glass border-r border-white/20 dark:border-night-600/50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:h-auto
        `}
      >
        <div className="px-5 flex items-center justify-between
                        border-b border-white/20 dark:border-night-600/50 shrink-0">
          <div className="flex items-center gap-2" />
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-xl text-slate-400
                       hover:text-slate-600 dark:hover:text-slate-200
                       hover:bg-slate-100 dark:hover:bg-night-600
                       transition-all duration-200"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

          <div>
            <p className="px-3 mb-2 text-xs font-display font-semibold
                          text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Navigation
            </p>
            <nav className="space-y-0.5">
              {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => {
                const isActive = activeFilter === id;
                const count    = countMap[id];
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-display font-medium
                      transition-all duration-200 group
                      ${isActive
                        ? "bg-violet-50 dark:bg-violet-900/25 text-violet-600 dark:text-violet-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-night-600 hover:text-slate-800 dark:hover:text-slate-200"
                      }
                    `}
                  >
                    <Icon
                      size={16}
                      className={isActive ? color : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500"}
                    />
                    <span className="flex-1 text-left">{label}</span>
                    {count > 0 && (
                      <span className={`
                        text-xs font-display font-bold px-2 py-0.5 rounded-full
                        ${isActive
                          ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                          : "bg-slate-100 dark:bg-night-600 text-slate-500 dark:text-slate-400"
                        }
                      `}>
                        {count}
                      </span>
                    )}
                    {isActive && <ChevronRight size={13} className="text-violet-400" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-display font-semibold
                          text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Overview
            </p>
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-semibold text-slate-500 dark:text-slate-400">
                  Completion
                </span>
                <span className="text-sm font-display font-bold text-violet-500">
                  {metrics.pct}%
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${metrics.pct}%` }} />
              </div>
              <p className="text-xs font-body text-slate-400 dark:text-slate-500">
                {metrics.completed} of {metrics.total} tasks done
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: "Done", val: metrics.completed,  color: "text-emerald-500" },
                  { label: "Busy", val: metrics.inProgress, color: "text-blue-500"    },
                  { label: "Todo", val: metrics.pending,    color: "text-amber-500"   },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5
                                              bg-slate-50 dark:bg-night-700/60 rounded-xl py-2">
                    <span className={`text-base font-display font-bold ${color}`}>{val}</span>
                    <span className="text-xs font-body text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-display font-semibold
                          text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Quick Actions
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => { onSeed(); onClose(); }}
                disabled={seeding}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           text-sm font-display font-medium
                           text-slate-600 dark:text-slate-400
                           hover:bg-violet-50 dark:hover:bg-violet-900/20
                           hover:text-violet-600 dark:hover:text-violet-400
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                <Zap size={15} className={seeding ? "animate-spin text-violet-400" : "text-slate-400"} />
                <span>{seeding ? "Seeding…" : "Seed Sample Tasks"}</span>
              </button>

              <button
                onClick={() => handleNav("all")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           text-sm font-display font-medium
                           text-slate-600 dark:text-slate-400
                           hover:bg-slate-50 dark:hover:bg-night-600
                           hover:text-slate-800 dark:hover:text-slate-200
                           transition-all duration-200"
              >
                <ListTodo size={15} className="text-slate-400" />
                <span>All Tasks</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-white/20 dark:border-night-600/50 shrink-0">
          <p className="text-xs font-body text-slate-400 dark:text-slate-500 text-center">
            TaskFlow v1.0 · MERN Stack
          </p>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;