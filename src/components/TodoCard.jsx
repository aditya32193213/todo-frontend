import { useState, useMemo, memo } from "react";
import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { STATUS_MAP } from "../features/tasks/taskConstants";

const TodoCard = memo(({ todo, onEdit, onDelete, onStatusChange, isExiting }) => {
  const [toggling, setToggling] = useState(false);

  const info = STATUS_MAP[todo.status] || STATUS_MAP["pending"];

  const handleToggle = async () => {
    setToggling(true);
    try {
      await onStatusChange(todo, info.next);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = () => onDelete(todo);

  const formattedDate = useMemo(() =>
    todo.createdAt
      ? new Date(todo.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day:   "numeric",
          year:  "numeric",
        })
      : "",
  [todo.createdAt]);

  return (
    <div
      className={`glass-card p-4 group ${isExiting ? "task-exit" : "animate-slide-up"}
        ${todo.status === "completed" ? "opacity-70" : ""}`}
    >
      <div className="flex items-start gap-3">

        {/* Status circle toggle */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          title={`Click to mark as ${info.next}`}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
            transition-all duration-300
            ${todo.status === "completed"
              ? "bg-emerald-500 border-emerald-500"
              : todo.status === "in-progress"
              ? "border-blue-400 hover:bg-blue-400/20"
              : "border-slate-300 dark:border-slate-600 hover:border-violet-400"}
            ${toggling ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {todo.status === "completed" && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.3 2.3L8 3" stroke="white" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {todo.status === "in-progress" && (
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm font-display font-semibold text-slate-800 dark:text-slate-100 leading-snug
                ${todo.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : ""}`}
            >
              {todo.title}
            </h3>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100
                            transition-opacity duration-200 shrink-0">
              <button
                onClick={() => onEdit(todo)}
                aria-label="Edit task"
                className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500
                           hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-150"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={handleDelete}
                aria-label="Delete task"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500
                           hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {todo.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-body mt-1 leading-relaxed line-clamp-2">
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <button
              onClick={handleToggle}
              disabled={toggling}
              className={`${info.cls} flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer`}
            >
              {info.label}
              <ChevronRight size={10} className="opacity-60" />
            </button>

            {formattedDate && (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-body">
                {formattedDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

TodoCard.displayName = "TodoCard";

export default TodoCard;