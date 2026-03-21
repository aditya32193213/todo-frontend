import { useState, useMemo, useCallback } from "react";
import {
  Plus, Search, X, ArrowUpDown,
  BarChart2, CheckCircle2, Clock, Loader2,
  ClipboardList, ChevronLeft, ChevronRight, AlertCircle,
} from "lucide-react";

import Navbar         from "../components/Navbar";
import Sidebar        from "../components/Sidebar";
import TodoCard       from "../components/TodoCard";
import TodoModal      from "../components/TodoModal";
import PageBackground from "../components/PageBackground";

import useTasks, { STATUSES } from "../hooks/useTasks";

const HOME_ORBS = [
  "w-[500px] h-[500px] bg-violet-400/12 dark:bg-violet-700/10 top-[-180px] right-[-100px]",
  "w-[380px] h-[380px] bg-violet-600/10 bottom-[-120px] left-[-80px]",
];

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

  const handleMobileMenuToggle = useCallback(
    () => setSidebarOpen((p) => !p),
    []
  );
  const handleSidebarClose = useCallback(
    () => setSidebarOpen(false),
    []
  );

  const metricCards = useMemo(() => [
    { icon: BarChart2,    label: "Total",       val: metrics.total,      color: "text-slate-600 dark:text-slate-300",    bg: "bg-slate-100 dark:bg-night-600"       },
    { icon: CheckCircle2, label: "Completed",   val: metrics.completed,  color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { icon: Loader2,      label: "In Progress", val: metrics.inProgress, color: "text-blue-600 dark:text-blue-400",       bg: "bg-blue-50 dark:bg-blue-900/20"       },
    { icon: Clock,        label: "Pending",     val: metrics.pending,    color: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-50 dark:bg-amber-900/20"     },
  ], [metrics.total, metrics.completed, metrics.inProgress, metrics.pending]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      <PageBackground orbs={HOME_ORBS} />

      <Navbar
        onSeed={handleSeed}
        seeding={seeding}
        onMobileMenuToggle={handleMobileMenuToggle}
        mobileMenuOpen={sidebarOpen}
      />

      <div className="flex flex-1 relative z-10">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
          metrics={metrics}
          onSeed={handleSeed}
          seeding={seeding}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 py-6 space-y-6">

          {/* Title + New Task */}
          <div className="flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
                My Tasks
              </h1>
              <p className="text-sm font-body text-slate-400 dark:text-slate-500 mt-0.5">
                {total > 0
                  ? `${total} task${total !== 1 ? "s" : ""} in total`
                  : "Stay organised, stay productive."}
              </p>
            </div>
            <button onClick={openCreate} className="btn-primary flex items-center gap-2">
              <Plus size={16} />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up">
            {metricCards.map(({ icon: Icon, label, val, color, bg }) => (
              <div key={label} className="metric-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {label}
                  </span>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${bg}`}>
                    <Icon size={14} className={color} />
                  </div>
                </div>
                <p className={`text-2xl font-display font-bold ${color}`}>{val}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="glass-card px-5 py-4 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
                Overall Completion
              </span>
              <span className="text-sm font-display font-bold text-violet-500">{metrics.pct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${metrics.pct}%` }} />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-body">
              {metrics.completed} of {metrics.total} tasks completed
            </p>
          </div>

          {/* Search + filter + sort */}
          <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                value={searchRaw}
                onChange={(e) => setSearchRaw(e.target.value)}
                placeholder="Search tasks…"
                className="input pl-10 pr-9"
              />
              {searchRaw && (
                <button onClick={() => setSearchRaw("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-night-700 shrink-0 flex-wrap">
              {STATUSES.map((s) => (
                <button key={s.value} onClick={() => setStatusFilter(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all duration-200
                    ${statusFilter === s.value
                      ? "bg-white dark:bg-night-600 text-violet-600 dark:text-violet-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>
                  {s.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "latest" ? "oldest" : "latest")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-display font-semibold
                         bg-slate-100 dark:bg-night-700 text-slate-600 dark:text-slate-300
                         hover:bg-slate-200 dark:hover:bg-night-600 transition-all duration-200 shrink-0">
              <ArrowUpDown size={14} />
              <span className="hidden sm:inline">{sortOrder === "latest" ? "Newest" : "Oldest"}</span>
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-night-600 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-night-600 rounded-lg w-3/4" />
                      <div className="h-3 bg-slate-100 dark:bg-night-700 rounded-lg w-full" />
                      <div className="h-5 w-20 bg-slate-200 dark:bg-night-600 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="glass-card p-10 flex flex-col items-center gap-4 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <AlertCircle size={24} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-slate-700 dark:text-slate-200">
                    Failed to load tasks
                  </h3>
                  <p className="text-sm font-body text-slate-400 mt-1">{error}</p>
                </div>
                <button onClick={fetchTodos} className="btn-primary flex items-center gap-2 mt-1">
                  Try again
                </button>
              </div>
            ) : todos.length === 0 ? (
              <div className="glass-card p-10 flex flex-col items-center gap-4 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-900/20
                                flex items-center justify-center animate-float">
                  {isFiltering
                    ? <Search size={24} className="text-violet-400" />
                    : <ClipboardList size={24} className="text-violet-400" />}
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-slate-700 dark:text-slate-200">
                    {isFiltering ? "No results found" : "No tasks yet"}
                  </h3>
                  <p className="text-sm font-body text-slate-400 mt-1">
                    {isFiltering
                      ? "Try adjusting your search or filter."
                      : "Create your first task or seed sample data."}
                  </p>
                </div>
                {!isFiltering && (
                  <button onClick={openCreate} className="btn-primary flex items-center gap-2 mt-1">
                    <Plus size={14} /> Add Task
                  </button>
                )}
              </div>
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

          {/* Pagination — uses memoized pageNumbers array */}
          {!loading && !error && todos.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pb-6 animate-fade-in">
              <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                           hover:bg-slate-100 dark:hover:bg-night-600
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                <ChevronLeft size={16} />
              </button>
              {pageNumbers.map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-xl text-sm font-display font-semibold transition-all duration-200
                    ${p === page
                      ? "bg-violet-500 text-white shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-night-600"}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                           hover:bg-slate-100 dark:hover:bg-night-600
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
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