import { useState, useMemo, memo } from "react";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { STATUS_MAP } from "../features/tasks/taskConstants";

/* Left accent bar colour per status */
const ACCENT = {
  completed:     "bg-emerald-400",
  "in-progress": "bg-blue-400",
  pending:       "bg-slate-400 dark:bg-slate-500",
};

/* Status circle styles */
const RING_STYLES = {
  completed:     "bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-500/40",
  "in-progress": "border-blue-400 hover:border-blue-500 hover:bg-blue-500/10",
  pending:       "border-slate-400 dark:border-slate-500 hover:border-violet-400 hover:bg-violet-500/10",
};

const TodoCard = memo(({ todo, onEdit, onDelete, onStatusChange, isExiting }) => {
  const [toggling, setToggling] = useState(false);

  const info   = STATUS_MAP[todo.status] || STATUS_MAP["pending"];
  const isDone = todo.status === "completed";
  const isWip  = todo.status === "in-progress";

  const handleToggle = async () => {
    if (toggling) return;
    setToggling(true);
    try {
      await onStatusChange(todo, info.next);
    } finally {
      setToggling(false);
    }
  };

  const formattedDate = useMemo(() =>
    todo.createdAt
      ? new Date(todo.createdAt).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      : "",
  [todo.createdAt]);

  return (
    <div
      className={`
        relative flex items-stretch rounded-2xl overflow-hidden
        border border-slate-200/70 dark:border-slate-700
        bg-white dark:bg-slate-800/70
        shadow-sm shadow-slate-900/[0.06] dark:shadow-black/20
        hover:shadow-md hover:shadow-slate-900/[0.10] dark:hover:shadow-black/30
        hover:-translate-y-0.5
        hover:border-slate-300 dark:hover:border-slate-600
        group transition-all duration-200
        ${isExiting ? "task-exit" : "animate-slide-up"}
        ${isDone ? "opacity-70 hover:opacity-90" : ""}
      `}
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 ${ACCENT[todo.status] ?? ACCENT.pending}
                       transition-colors duration-300`} />

      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 py-3.5">
        <div className="flex items-center gap-3">

          {/* Status circle toggle */}
          <button
            onClick={handleToggle}
            disabled={toggling}
            title={`Cycle status → ${info.next}`}
            aria-label={`Cycle status → ${info.next}`}
            className={`
              shrink-0 w-5 h-5 rounded-full border-2
              flex items-center justify-center
              transition-all duration-200
              ${RING_STYLES[todo.status] ?? RING_STYLES.pending}
              ${toggling ? "opacity-40 cursor-not-allowed scale-90" : "cursor-pointer hover:scale-110"}
            `}
          >
            {isDone && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.3 2.3L8 3"
                      stroke="white" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isWip && !toggling && (
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            )}
            {toggling && (
              <div className="w-2.5 h-2.5 rounded-full border border-slate-300
                              border-t-violet-500 animate-spin" />
            )}
          </button>

          {/* Text content */}
          <div className="flex-1 min-w-0">

            {/* Title */}
            <h3 className={`
              text-sm font-display font-semibold leading-snug truncate
              transition-colors duration-200
              ${isDone
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-800 dark:text-slate-100"}
            `}>
              {todo.title}
            </h3>

            {/* Description */}
            {todo.description && (
              <p className="text-xs font-body text-slate-500 dark:text-slate-400
                            mt-0.5 leading-relaxed line-clamp-1">
                {todo.description}
              </p>
            )}
          </div>

          {/* ── Right side: badge + date + actions ────────────── */}
          <div className="flex items-center gap-2 shrink-0 ml-2">

            {/* Status badge — display only, circle is the toggle */}
            <span
              className={`
                hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                text-[11px] font-display font-semibold
                border whitespace-nowrap select-none
                ${info.cls}
              `}
            >
              {info.label}
            </span>

            {/* Date */}
            {formattedDate && (
              <div className="hidden md:flex items-center gap-1 text-xs font-body
                              text-slate-400 dark:text-slate-500 whitespace-nowrap">
                <Calendar size={10} className="shrink-0" />
                {formattedDate}
              </div>
            )}

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700 mx-0.5" />

            {/* Action buttons — always visible, larger hit targets */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(todo)}
                aria-label="Edit task"
                title="Edit task"
                className="flex items-center justify-center w-8 h-8 rounded-lg
                           text-slate-400 dark:text-slate-500
                           hover:text-violet-600 dark:hover:text-violet-400
                           hover:bg-violet-50 dark:hover:bg-violet-500/15
                           border border-transparent
                           hover:border-violet-200/60 dark:hover:border-violet-500/20
                           transition-all duration-150"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(todo)}
                aria-label="Delete task"
                title="Delete task"
                className="flex items-center justify-center w-8 h-8 rounded-lg
                           text-slate-400 dark:text-slate-500
                           hover:text-red-500 dark:hover:text-red-400
                           hover:bg-red-50 dark:hover:bg-red-500/15
                           border border-transparent
                           hover:border-red-200/60 dark:hover:border-red-500/20
                           transition-all duration-150"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-only footer: badge + date (hidden on sm+) */}
        <div className="flex items-center gap-2 mt-2.5 sm:hidden flex-wrap">
          <span
            className={`
              inline-flex items-center gap-1 px-2.5 py-1 rounded-full
              text-[11px] font-display font-semibold
              border select-none
              ${info.cls}
            `}
          >
            {info.label}
          </span>

          {formattedDate && (
            <div className="flex items-center gap-1 text-xs font-body
                            text-slate-400 dark:text-slate-500">
              <Calendar size={10} className="shrink-0" />
              {formattedDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

TodoCard.displayName = "TodoCard";
export default TodoCard;