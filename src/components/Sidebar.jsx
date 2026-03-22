import { useMemo, memo, useCallback } from "react";
import { ListTodo, Zap, X, ChevronRight, TrendingUp } from "lucide-react";
import { NAV_ITEMS } from "../features/tasks/taskConstants";

const EMPTY_METRICS = { total: 0, completed: 0, inProgress: 0, pending: 0, pct: 0 };

const STAT_DOTS = [
  { key: "completed",  label: "Done",   dot: "bg-emerald-400", color: "text-emerald-600 dark:text-emerald-400" },
  { key: "inProgress", label: "Active", dot: "bg-blue-400",    color: "text-blue-600 dark:text-blue-400"       },
  { key: "pending",    label: "Todo",   dot: "bg-amber-400",   color: "text-amber-600 dark:text-amber-400"     },
];

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
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64 flex flex-col
          bg-white/80 dark:bg-night-900/80
          backdrop-blur-xl
          border-r border-slate-200/60 dark:border-white/8
          shadow-xl shadow-slate-900/8 dark:shadow-black/20
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:z-auto
          lg:h-full lg:shadow-none lg:shrink-0
        `}
      >

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4  shrink-0
                        border-b border-slate-200/60 dark:border-white/8">

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg
                       text-slate-400 dark:text-slate-300
                       hover:text-slate-600 dark:hover:text-white
                       hover:bg-slate-100 dark:hover:bg-slate-700
                       transition-all duration-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable body ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

          {/* ── Navigation ─────────────────────────────────────────── */}
          <section>
            <p className="px-3 mb-2 text-[10px] font-display font-bold
                          text-slate-400 dark:text-slate-400
                          uppercase tracking-[0.12em]">
              Filters
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
                        ? "bg-violet-500/15 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-500/20 dark:ring-violet-500/30"
                        : "text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-800 dark:hover:text-white"
                      }
                    `}
                  >
                    {/* Icon tile */}
                    <div className={`
                      w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                      transition-all duration-200
                      ${isActive
                        ? "bg-violet-500/20 dark:bg-violet-500/30"
                        : "bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"
                      }
                    `}>
                      <Icon
                        size={14}
                        className={isActive ? color : "text-slate-500 dark:text-slate-300"}
                      />
                    </div>

                    <span className="flex-1 text-left">{label}</span>

                    {/* Count badge */}
                    {count > 0 && (
                      <span className={`
                        text-xs font-display font-bold px-2 py-0.5 rounded-full
                        min-w-[22px] text-center transition-all duration-200
                        ${isActive
                          ? "bg-violet-500 text-white shadow-sm shadow-violet-500/30"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
                        }
                      `}>
                        {count}
                      </span>
                    )}

                    {/* Active chevron */}
                    {isActive && (
                      <ChevronRight size={12} className="text-violet-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>
          </section>

          {/* ── Progress ───────────────────────────────────────────── */}
          <section>
            <p className="px-3 mb-2 text-[10px] font-display font-bold
                          text-slate-400 dark:text-slate-400
                          uppercase tracking-[0.12em]">
              Progress
            </p>

            <div className="rounded-2xl overflow-hidden
                            border border-slate-200/60 dark:border-slate-700
                            bg-white/60 dark:bg-slate-800/60">

              {/* Card header */}
              <div className="px-4 py-3 flex items-center justify-between
                              border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <TrendingUp size={13} className="text-violet-500" />
                  <span className="text-xs font-display font-semibold
                                   text-slate-600 dark:text-slate-200">
                    Completion
                  </span>
                </div>
                <span className="text-sm font-display font-bold
                                 text-transparent bg-clip-text
                                 bg-gradient-to-r from-violet-500 to-indigo-400">
                  {metrics.pct}%
                </span>
              </div>

              {/* Progress bar + stats */}
              <div className="px-4 py-3 space-y-3">
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out
                               bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-400"
                    style={{ width: `${metrics.pct}%` }}
                  />
                </div>

                <p className="text-xs font-body text-slate-400 dark:text-slate-400">
                  {metrics.completed} of {metrics.total} tasks completed
                </p>

                {/* Mini stat tiles */}
                <div className="grid grid-cols-3 gap-1.5">
                  {STAT_DOTS.map(({ key, label, dot, color }) => (
                    <div
                      key={key}
                      className="flex flex-col items-center gap-1 py-2.5 rounded-xl
                                 bg-slate-50 dark:bg-slate-700/80
                                 border border-slate-100 dark:border-slate-600"
                    >
                      <span className={`text-base font-display font-bold ${color}`}>
                        {metrics[key]}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                        <span className="text-[10px] font-body
                                         text-slate-400 dark:text-slate-400">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Quick Actions ──────────────────────────────────────── */}
          <section>
            <p className="px-3 mb-2 text-[10px] font-display font-bold
                          text-slate-400 dark:text-slate-400
                          uppercase tracking-[0.12em]">
              Quick Actions
            </p>

            <div className="space-y-0.5">
              {/* Seed */}
              <button
                onClick={() => { onSeed(); onClose(); }}
                disabled={seeding}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           text-sm font-display font-medium
                           text-slate-600 dark:text-slate-200
                           hover:bg-violet-50 dark:hover:bg-violet-500/15
                           hover:text-violet-600 dark:hover:text-violet-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                bg-slate-100 dark:bg-slate-700
                                group-hover:bg-violet-100 dark:group-hover:bg-violet-500/25
                                transition-colors duration-200">
                  <Zap
                    size={13}
                    className={`transition-colors duration-200 ${
                      seeding
                        ? "animate-spin text-violet-400"
                        : "text-slate-500 dark:text-slate-300 group-hover:text-violet-500"
                    }`}
                  />
                </div>
                <span>{seeding ? "Seeding…" : "Seed Sample Tasks"}</span>
              </button>

              {/* All Tasks */}
              <button
                onClick={() => handleNav("all")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           text-sm font-display font-medium
                           text-slate-600 dark:text-slate-200
                           hover:bg-slate-100 dark:hover:bg-slate-700/60
                           hover:text-slate-800 dark:hover:text-white
                           transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                bg-slate-100 dark:bg-slate-700
                                group-hover:bg-slate-200 dark:group-hover:bg-slate-600
                                transition-colors duration-200">
                  <ListTodo
                    size={13}
                    className="text-slate-500 dark:text-slate-300
                               group-hover:text-slate-700 dark:group-hover:text-white
                               transition-colors duration-200"
                  />
                </div>
                <span>All Tasks</span>
              </button>
            </div>
          </section>

        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="px-4 py-3 shrink-0
                        border-t border-slate-200/60 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-body text-slate-400 dark:text-slate-400">
                All systems online
              </span>
            </div>
            <span className="text-[10px] font-display font-semibold
                             text-slate-400 dark:text-slate-500
                             uppercase tracking-wider">
              v1.0
            </span>
          </div>
        </div>

      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;