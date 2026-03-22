import { useEffect, useRef, useState } from "react";
import { X, Plus, Save, AlertTriangle, Pencil, Trash2, FileText } from "lucide-react";
import { STATUS_VALUES, STATUS_LABELS } from "../features/tasks/taskConstants";

/* Per-status pill config for the selector */
const STATUS_CONFIG = {
  pending: {
    active:   "bg-amber-50 dark:bg-amber-500/12 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/40 shadow-sm shadow-amber-500/15",
    inactive: "bg-slate-50 dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/8 hover:bg-amber-50/60 dark:hover:bg-amber-500/6 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-500/20",
    dot:      "bg-amber-400",
  },
  "in-progress": {
    active:   "bg-blue-50 dark:bg-blue-500/12 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/40 shadow-sm shadow-blue-500/15",
    inactive: "bg-slate-50 dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/8 hover:bg-blue-50/60 dark:hover:bg-blue-500/6 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/20",
    dot:      "bg-blue-400",
  },
  completed: {
    active:   "bg-emerald-50 dark:bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40 shadow-sm shadow-emerald-500/15",
    inactive: "bg-slate-50 dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/8 hover:bg-emerald-50/60 dark:hover:bg-emerald-500/6 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-500/20",
    dot:      "bg-emerald-400",
  },
};

const TITLE_ID = "modal-dialog-title";

const TodoModal = ({ isOpen, onClose, onSave, mode, formData, setFormData, isMutating = false }) => {
  const titleRef = useRef(null);
  const isDelete = mode === "delete";
  const isEdit   = mode === "edit";

  const [titleTouched, setTitleTouched] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!isOpen || isDelete) return;
    setTitleTouched(false);
    const t = setTimeout(() => titleRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [isOpen, isDelete]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const titleError = !formData.title?.trim() && titleTouched;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[3px] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-md animate-slide-up">
        <div className="rounded-t-3xl sm:rounded-2xl overflow-hidden
                        bg-white dark:bg-night-800
                        border border-slate-200/80 dark:border-white/10
                        shadow-2xl shadow-slate-900/20 dark:shadow-black/40">

          {/* Drag pill — mobile only */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-white/15" />
          </div>

          {/* ── Header ──────────────────────────────────────────────── */}
          <div className={`
            px-6 py-4 flex items-center justify-between
            ${isDelete
              ? "bg-red-50/50 dark:bg-red-500/[0.06] border-b border-red-100/80 dark:border-red-500/15"
              : "border-b border-slate-100 dark:border-white/8"}
          `}>
            <div className="flex items-center gap-3">
              {/* Icon tile */}
              <div className={`
                w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                ${isDelete
                  ? "bg-red-100 dark:bg-red-500/15"
                  : isEdit
                  ? "bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-500/15 dark:to-indigo-500/10"
                  : "bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-500/15 dark:to-indigo-500/10"}
              `}>
                {isDelete
                  ? <Trash2 size={16} className="text-red-500" />
                  : isEdit
                  ? <Pencil size={15} className="text-violet-500" />
                  : <Plus   size={16} className="text-violet-500" />}
              </div>

              <div>
                <h2
                  id={TITLE_ID}
                  className="text-base font-display font-bold text-slate-800 dark:text-white leading-tight"
                >
                  {mode === "create" && "New Task"}
                  {mode === "edit"   && "Edit Task"}
                  {mode === "delete" && "Delete Task"}
                </h2>
                <p className="text-xs font-body text-slate-400 dark:text-slate-500 mt-0.5">
                  {mode === "create" && "Add a new task to your workspace"}
                  {mode === "edit"   && "Update the task details below"}
                  {mode === "delete" && "This action is permanent"}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-xl
                         text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                         hover:bg-slate-100 dark:hover:bg-white/8
                         transition-all duration-200 shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Body ────────────────────────────────────────────────── */}
          <div className="px-6 py-5">
            {isDelete ? (

              /* Delete confirmation */
              <div className="flex flex-col items-center gap-4 py-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-500/15
                                flex items-center justify-center">
                  <AlertTriangle size={26} className="text-red-500" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
                    Are you sure you want to delete this task?
                  </p>
                  <p className="text-xs font-body text-slate-400 dark:text-slate-500">
                    This will permanently remove the task and cannot be undone.
                  </p>
                </div>
              </div>

            ) : (

              /* Create / Edit form */
              <div className="space-y-4">

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between">
                    <span className="text-xs font-display font-semibold
                                     text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Title <span className="text-red-400 ml-0.5">*</span>
                    </span>
                    {formData.title && (
                      <span className="text-[10px] font-body text-slate-400 dark:text-slate-500">
                        {formData.title.length} / 100
                      </span>
                    )}
                  </label>
                  <input
                    ref={titleRef}
                    value={formData.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    onBlur={() => setTitleTouched(true)}
                    placeholder="What needs to be done?"
                    maxLength={100}
                    className={`
                      w-full px-3.5 py-2.5 rounded-xl text-sm font-body
                      bg-slate-50 dark:bg-white/[0.04]
                      border transition-all duration-200
                      text-slate-800 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-500
                      focus:outline-none focus:ring-2
                      ${titleError
                        ? "border-red-300 dark:border-red-500/40 focus:ring-red-400/30 focus:border-red-400"
                        : "border-slate-200 dark:border-white/8 focus:ring-violet-400/30 focus:border-violet-400/60"}
                    `}
                  />
                  {titleError && (
                    <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                      <AlertTriangle size={11} />
                      Title is required
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5">
                    <FileText size={11} className="text-slate-400" />
                    <span className="text-xs font-display font-semibold
                                     text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Description
                    </span>
                    <span className="text-[10px] font-body text-slate-400 dark:text-slate-500 ml-auto">
                      optional
                    </span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Add more details about this task…"
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-body resize-none
                               bg-slate-50 dark:bg-white/[0.04]
                               border border-slate-200 dark:border-white/8
                               text-slate-800 dark:text-slate-100
                               placeholder:text-slate-400 dark:placeholder:text-slate-500
                               focus:outline-none focus:ring-2 focus:ring-violet-400/30
                               focus:border-violet-400/60 transition-all duration-200"
                  />
                </div>

                {/* Status selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-semibold
                                    text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
                    Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {STATUS_VALUES.map((s) => {
                      const cfg      = STATUS_CONFIG[s];
                      const isActive = formData.status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleFieldChange("status", s)}
                          className={`
                            flex flex-col items-center gap-1.5 px-2 py-2.5
                            rounded-xl border text-xs font-display font-semibold
                            transition-all duration-200 active:scale-95
                            ${isActive ? cfg.active : cfg.inactive}
                          `}
                        >
                          <span className={`w-2 h-2 rounded-full ${cfg.dot}
                                           ${isActive ? "scale-125" : ""} transition-transform duration-200`} />
                          {STATUS_LABELS[s]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Action buttons ─────────────────────────────────────── */}
            <div className="flex gap-2.5 mt-6">
              {/* Cancel */}
              <button
                onClick={onClose}
                disabled={isMutating}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-display font-semibold
                           text-slate-700 dark:text-slate-100
                           bg-slate-100 dark:bg-slate-700
                           border border-slate-200/80 dark:border-slate-600
                           hover:bg-slate-200 dark:hover:bg-slate-600
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                Cancel
              </button>

              {/* Primary action */}
              <button
                disabled={isMutating}
                onClick={() => {
                  if (!isDelete && !formData.title?.trim()) {
                    setTitleTouched(true);
                    return;
                  }
                  onSave();
                }}
                className={`
                  relative flex-1 flex items-center justify-center gap-2
                  py-2.5 px-4 rounded-xl text-sm font-display font-semibold text-white
                  overflow-hidden transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${isDelete
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-lg shadow-red-500/25 focus:ring-red-500/40"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 focus:ring-violet-500/40"}
                `}
              >
                {/* Shimmer */}
                {!isMutating && (
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                                   translate-x-[-100%] hover:translate-x-[100%]
                                   transition-transform duration-700 ease-in-out" />
                )}

                {isMutating ? (
                  <>
                    <div className="spinner" />
                    {isDelete ? "Deleting…" : isEdit ? "Saving…" : "Adding…"}
                  </>
                ) : isDelete ? (
                  <><Trash2 size={14} /> Delete Task</>
                ) : isEdit ? (
                  <><Save size={14} /> Save Changes</>
                ) : (
                  <><Plus size={14} /> Add Task</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;