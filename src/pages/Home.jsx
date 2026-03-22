import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Plus, Search, X, ChevronDown,
  BarChart2, CheckCircle2, Clock, Loader2,
  ClipboardList, ChevronLeft, ChevronRight, AlertCircle,
  TrendingUp, Sparkles, ListFilter, SlidersHorizontal,
} from "lucide-react";

import Navbar         from "../components/Navbar";
import Sidebar        from "../components/Sidebar";
import TodoCard       from "../components/TodoCard";
import TodoModal      from "../components/TodoModal";
import PageBackground from "../components/PageBackground";

import useTasks, { STATUSES } from "../hooks/useTasks";

const HOME_ORBS = [
  "w-[600px] h-[600px] bg-violet-400/8 dark:bg-violet-700/8 top-[-200px] right-[-120px] blur-3xl",
  "w-[400px] h-[400px] bg-indigo-500/6 dark:bg-indigo-700/6 bottom-[-140px] left-[-100px] blur-3xl",
  "w-[300px] h-[300px] bg-purple-400/5 top-[40%] left-[30%] blur-2xl",
];

const SORT_OPTIONS = [
  { value: "latest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "a-z",    label: "A to Z"       },
  { value: "z-a",    label: "Z to A"       },
];

/* ─── Skeleton loader card ──────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-200/60 dark:border-white/6
                  bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-4 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/8 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-slate-200 dark:bg-white/8 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded-lg w-full" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-slate-200 dark:bg-white/8 rounded-full" />
          <div className="h-3 w-16 bg-slate-100 dark:bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    todos, loading, error, exitId, fetchTodos,
    page, setPage, totalPages, total,
    searchRaw, setSearchRaw, statusFilter, setStatusFilter, sortOrder, setSortOrder,
    metrics,
    isModalOpen, modalMode, formData, setFormData,
    openCreate, openEdit, openDelete, closeModal,
    handleSave, handleStatusChange, handleSeed, seeding,
    isFiltering, isMutating,
  } = useTasks();

  const handleMobileMenuToggle = useCallback(() => setSidebarOpen((p) => !p), []);
  const handleSidebarClose     = useCallback(() => setSidebarOpen(false), []);

  /* Custom sort dropdown state */
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef                 = useRef(null);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);

  /* Metric card config ──────────────────────────────────────────────── */
  const metricCards = useMemo(() => [
    {
      icon: BarChart2, label: "Total Tasks", val: metrics.total,
      color: "text-slate-700 dark:text-slate-200",
      iconColor: "text-slate-500 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-white/8",
      border: "border-slate-200/80 dark:border-white/8",
      gradient: "from-slate-50 to-white/50 dark:from-white/[0.03] dark:to-white/[0.01]",
    },
    {
      icon: CheckCircle2, label: "Completed", val: metrics.completed,
      color: "text-emerald-700 dark:text-emerald-400",
      iconColor: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200/60 dark:border-emerald-500/20",
      gradient: "from-emerald-50/80 to-white/50 dark:from-emerald-500/[0.06] dark:to-transparent",
    },
    {
      icon: Loader2, label: "In Progress", val: metrics.inProgress,
      color: "text-blue-700 dark:text-blue-400",
      iconColor: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200/60 dark:border-blue-500/20",
      gradient: "from-blue-50/80 to-white/50 dark:from-blue-500/[0.06] dark:to-transparent",
    },
    {
      icon: Clock, label: "Pending", val: metrics.pending,
      color: "text-amber-700 dark:text-amber-400",
      iconColor: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200/60 dark:border-amber-500/20",
      gradient: "from-amber-50/80 to-white/50 dark:from-amber-500/[0.06] dark:to-transparent",
    },
  ], [metrics.total, metrics.completed, metrics.inProgress, metrics.pending]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  /* Active filter count ─────────────────────────────────────────────── */
  const activeFilters = (searchRaw.trim() ? 1 : 0) + (statusFilter !== "all" ? 1 : 0);
  const clearAllFilters = useCallback(() => {
    setSearchRaw("");
    setStatusFilter("all");
  }, [setSearchRaw, setStatusFilter]);

  return (
    <div className="h-screen overflow-hidden flex flex-col relative">
      <PageBackground orbs={HOME_ORBS} />

      <Navbar
        onSeed={handleSeed}
        seeding={seeding}
        onMobileMenuToggle={handleMobileMenuToggle}
        mobileMenuOpen={sidebarOpen}
      />

      <div className="flex flex-1 relative z-10 overflow-hidden min-h-0">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
          metrics={metrics}
          onSeed={handleSeed}
          seeding={seeding}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">

          {/* ── Page header ─────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4 animate-slide-up">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-display font-bold
                               text-slate-800 dark:text-white tracking-tight">
                  My Tasks
                </h1>
              </div>
              <p className="text-sm font-body text-slate-400 dark:text-slate-500">
                Stay organised, stay productive.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                         text-sm font-display font-semibold text-white shrink-0
                         bg-gradient-to-r from-violet-600 to-indigo-600
                         hover:from-violet-500 hover:to-indigo-500
                         shadow-lg shadow-violet-500/25
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2">
              <Plus size={16} />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>

          {/* ── Metric cards ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
            {metricCards.map(({ icon: Icon, label, val, color, iconColor, bg, border, gradient }) => (
              <div
                key={label}
                className={`relative rounded-2xl border ${border}
                            bg-gradient-to-br ${gradient}
                            backdrop-blur-sm p-4 overflow-hidden
                            hover:shadow-md hover:-translate-y-0.5
                            transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display font-semibold
                                   text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {label}
                  </span>
                  <div className={`w-7 h-7 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={13} className={iconColor} />
                  </div>
                </div>
                <p className={`text-3xl font-display font-bold ${color} leading-none`}>{val}</p>
              </div>
            ))}
          </div>

          {/* ── Progress card ─────────────────────────────────────────── */}
          <div className="rounded-2xl border border-slate-200/60 dark:border-white/8
                          bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm
                          px-6 py-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-violet-100 dark:bg-violet-500/15
                                flex items-center justify-center">
                  <TrendingUp size={13} className="text-violet-500" />
                </div>
                <span className="text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
                  Overall Completion
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-body text-slate-400 dark:text-slate-500 hidden sm:block">
                  {metrics.completed} of {metrics.total} tasks
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-display font-bold
                                 bg-violet-100 dark:bg-violet-500/15
                                 text-violet-600 dark:text-violet-400
                                 border border-violet-200/50 dark:border-violet-500/20">
                  {metrics.pct}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out
                           bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-400"
                style={{ width: `${metrics.pct}%` }}
              />
            </div>

            {/* Legend dots */}
            {metrics.total > 0 && (
              <div className="flex items-center gap-5 mt-3 flex-wrap">
                {[
                  { dot: "bg-emerald-400", label: `${metrics.completed} done`    },
                  { dot: "bg-blue-400",    label: `${metrics.inProgress} active`  },
                  { dot: "bg-amber-400",   label: `${metrics.pending} pending`    },
                ].map(({ dot, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
                    <span className="text-xs font-body text-slate-400 dark:text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Toolbar: Search + Sort + Filter ──────────────────────── */}
          <div className="space-y-3 animate-slide-up">

            {/* Row 1: search + sort */}
            <div className="flex flex-col sm:flex-row gap-2.5">

              {/* Search input */}
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  value={searchRaw}
                  onChange={(e) => setSearchRaw(e.target.value)}
                  placeholder="Search tasks…"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm font-body
                             bg-white/70 dark:bg-white/[0.04]
                             border border-slate-200/80 dark:border-white/8
                             text-slate-700 dark:text-slate-200
                             placeholder:text-slate-400 dark:placeholder:text-slate-500
                             focus:outline-none focus:ring-2 focus:ring-violet-400/40
                             backdrop-blur-sm transition-all duration-200"
                />
                {searchRaw && (
                  <button
                    onClick={() => setSearchRaw("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                               text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                               transition-colors p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/8">
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort dropdown — custom, fully styled */}
              <div ref={sortRef} className="relative shrink-0">
                {/* Trigger button */}
                <button
                  onClick={() => setSortOpen((p) => !p)}
                  className={`flex items-center gap-2 pl-3 pr-3 py-2.5 rounded-xl
                              text-sm font-display font-medium
                              border transition-all duration-200 min-w-[148px]
                              ${sortOpen
                                ? "bg-white dark:bg-slate-800 border-violet-400/60 dark:border-violet-500/50 ring-2 ring-violet-400/30 text-slate-700 dark:text-slate-100"
                                : "bg-white/70 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/8 text-slate-600 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/15 hover:bg-white dark:hover:bg-white/[0.07]"
                              }`}
                >
                  <SlidersHorizontal size={13} className="text-slate-400 dark:text-slate-400 shrink-0" />
                  <span className="flex-1 text-left">
                    {SORT_OPTIONS.find((o) => o.value === sortOrder)?.label ?? "Sort"}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`text-slate-400 dark:text-slate-400 shrink-0
                                transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {sortOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 z-30
                               rounded-xl overflow-hidden
                               bg-white dark:bg-slate-800
                               border border-slate-200/80 dark:border-slate-700
                               shadow-xl shadow-slate-900/12 dark:shadow-black/40
                               animate-slide-up"
                  >
                    <div className="p-1">
                      {SORT_OPTIONS.map((opt) => {
                        const isSelected = sortOrder === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => { setSortOrder(opt.value); setSortOpen(false); }}
                            className={`w-full flex items-center justify-between
                                        gap-3 px-3 py-2.5 rounded-lg
                                        text-sm font-display font-medium
                                        transition-all duration-150
                                        ${isSelected
                                          ? "bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300"
                                          : "text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white"
                                        }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && (
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                   className="text-violet-500 shrink-0">
                                <path d="M2 6.5l3 3 6-6" stroke="currentColor"
                                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: filter pills + clear button */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <ListFilter size={13} className="text-slate-400" />
                <span className="text-xs font-display font-semibold text-slate-400 dark:text-slate-500">
                  Filter:
                </span>
              </div>

              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold
                              transition-all duration-200
                              ${statusFilter === s.value
                                ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-500/25"
                                : "bg-white/60 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-white/8 hover:bg-white dark:hover:bg-white/8 hover:text-slate-700 dark:hover:text-slate-200 backdrop-blur-sm"
                              }`}>
                  {s.label}
                </button>
              ))}

              {activeFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs
                             font-display font-semibold
                             text-red-500 dark:text-red-400
                             bg-red-50 dark:bg-red-500/10
                             border border-red-200/60 dark:border-red-500/20
                             hover:bg-red-100 dark:hover:bg-red-500/20
                             transition-all duration-200">
                  <X size={11} />
                  Clear {activeFilters} filter{activeFilters > 1 ? "s" : ""}
                </button>
              )}
            </div>
          </div>

          {/* ── Task list ─────────────────────────────────────────────── */}
          <div className="space-y-2.5">

            {/* Sub-header when tasks exist */}
            {!loading && !error && todos.length > 0 && (
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-display font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {isFiltering
                    ? `${todos.length} result${todos.length !== 1 ? "s" : ""}`
                    : `Showing ${todos.length} of ${total}`}
                </span>
                {totalPages > 1 && (
                  <span className="text-xs font-body text-slate-400 dark:text-slate-500">
                    Page {page} of {totalPages}
                  </span>
                )}
              </div>
            )}

            {/* Loading */}
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)

            /* Error */
            ) : error ? (
              <div className="rounded-2xl border border-red-200/60 dark:border-red-500/20
                              bg-red-50/40 dark:bg-red-500/[0.04] backdrop-blur-sm
                              p-10 flex flex-col items-center gap-4 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-500/15
                                flex items-center justify-center">
                  <AlertCircle size={24} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-slate-700 dark:text-slate-200">
                    Failed to load tasks
                  </h3>
                  <p className="text-sm font-body text-slate-400 dark:text-slate-500 mt-1">{error}</p>
                </div>
                <button
                  onClick={fetchTodos}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                             font-display font-semibold text-white
                             bg-gradient-to-r from-violet-600 to-indigo-600
                             hover:from-violet-500 hover:to-indigo-500
                             shadow-md shadow-violet-500/20 transition-all duration-200">
                  Try again
                </button>
              </div>

            /* Empty state */
            ) : todos.length === 0 ? (
              <div className="rounded-2xl border border-slate-200/60 dark:border-white/8
                              bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm
                              p-14 flex flex-col items-center gap-5 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-2xl animate-float
                                bg-gradient-to-br from-violet-100 to-indigo-100
                                dark:from-violet-500/15 dark:to-indigo-500/15
                                border border-violet-200/50 dark:border-violet-500/20
                                flex items-center justify-center">
                  {isFiltering
                    ? <Search size={26} className="text-violet-400" />
                    : <Sparkles size={26} className="text-violet-400" />}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-display font-bold text-slate-700 dark:text-slate-200">
                    {isFiltering ? "No results found" : "You're all clear!"}
                  </h3>
                  <p className="text-sm font-body text-slate-400 dark:text-slate-500 max-w-xs">
                    {isFiltering
                      ? "Try adjusting your search or filter, or clear all filters to see everything."
                      : "Create your first task or seed some sample data to get started."}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap justify-center">
                  {isFiltering ? (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm
                                 font-display font-semibold
                                 text-slate-600 dark:text-slate-300
                                 bg-slate-100 dark:bg-white/8
                                 border border-slate-200/80 dark:border-white/8
                                 hover:bg-slate-200 dark:hover:bg-white/12
                                 transition-all duration-200">
                      <X size={14} /> Clear filters
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                                   font-display font-semibold text-white
                                   bg-gradient-to-r from-violet-600 to-indigo-600
                                   hover:from-violet-500 hover:to-indigo-500
                                   shadow-md shadow-violet-500/20 transition-all duration-200">
                        <Plus size={14} /> Add Task
                      </button>
                      <button
                        onClick={handleSeed}
                        disabled={seeding}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                                   font-display font-semibold
                                   text-slate-600 dark:text-slate-300
                                   bg-slate-100 dark:bg-white/8
                                   border border-slate-200/80 dark:border-white/8
                                   hover:bg-slate-200 dark:hover:bg-white/12
                                   disabled:opacity-50 transition-all duration-200">
                        {seeding
                          ? <><Loader2 size={14} className="animate-spin" /> Seeding…</>
                          : <><ClipboardList size={14} /> Seed sample tasks</>}
                      </button>
                    </>
                  )}
                </div>
              </div>

            /* Task cards */
            ) : (
              todos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  onEdit={openEdit}
                  onDelete={openDelete}
                  onStatusChange={handleStatusChange}
                  isExiting={exitId === todo._id}
                />
              ))
            )}
          </div>

          {/* ── Pagination ────────────────────────────────────────────── */}
          {!loading && !error && todos.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pb-4 animate-fade-in">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                           text-xs font-display font-semibold
                           text-slate-500 dark:text-slate-400
                           bg-white/60 dark:bg-white/[0.04]
                           border border-slate-200/80 dark:border-white/8
                           hover:bg-white dark:hover:bg-white/8
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-200 backdrop-blur-sm">
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-display font-semibold
                                transition-all duration-200
                                ${p === page
                                  ? "bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-500/25"
                                  : "text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/8 hover:bg-white dark:hover:bg-white/8 backdrop-blur-sm"
                                }`}>
                    {p}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                           text-xs font-display font-semibold
                           text-slate-500 dark:text-slate-400
                           bg-white/60 dark:bg-white/[0.04]
                           border border-slate-200/80 dark:border-white/8
                           hover:bg-white dark:hover:bg-white/8
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-200 backdrop-blur-sm">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
        </main>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        isMutating={isMutating}
      />
    </div>
  );
};

export default Home;