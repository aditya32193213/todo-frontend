import { useEffect, useRef, useState } from "react";
import { X, Plus, Save, AlertTriangle } from "lucide-react";
import { STATUS_VALUES, STATUS_LABELS } from "../features/tasks/taskConstants";

// FIX 1: receives isMutating prop so the Save button shows a spinner and
//         disables during an in-flight API call.
// FIX 2: modal wrapper gets aria-labelledby pointing to the h2 title element
//         so screen readers announce the dialog's purpose on open.

const TodoModal = ({ isOpen, onClose, onSave, mode, formData, setFormData, isMutating = false }) => {
  const titleRef  = useRef(null);
  const isDelete  = mode === "delete";
  const isEdit    = mode === "edit";
  const TITLE_ID  = "modal-dialog-title"; // stable id for aria-labelledby

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID} // FIX 2: associates heading with dialog
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md form-scene animate-slide-up">
        <div className="form-3d glass rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-night-600
                          flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                ${isDelete ? "bg-red-100 dark:bg-red-900/30" : "bg-violet-100 dark:bg-violet-900/30"}`}>
                {isDelete
                  ? <AlertTriangle size={15} className="text-red-500" />
                  : isEdit
                  ? <Save size={15} className="text-violet-500" />
                  : <Plus size={15} className="text-violet-500" />}
              </div>
              {/* FIX 2: id matches aria-labelledby on the dialog wrapper */}
              <h2 id={TITLE_ID} className="text-lg font-display font-bold text-slate-800 dark:text-white">
                {mode === "create" && "New Todo"}
                {mode === "edit"   && "Edit Todo"}
                {mode === "delete" && "Delete Todo"}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                         hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200"
            >
              <X size={17} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {isDelete ? (
              <p className="text-sm font-body text-slate-500 dark:text-slate-400 text-center py-2">
                Are you sure you want to permanently delete this task?
                <br />This action cannot be undone.
              </p>
            ) : (
              <div className="space-y-4">

                <div>
                  <label className="block text-xs font-display font-semibold
                                    text-slate-600 dark:text-slate-300 mb-1.5">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    value={formData.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    onBlur={() => setTitleTouched(true)}
                    placeholder="What needs to be done?"
                    maxLength={100}
                    className={`input ${!formData.title?.trim() && titleTouched ? "input-error" : ""}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold
                                    text-slate-600 dark:text-slate-300 mb-1.5">
                    Description{" "}
                    <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Add details…"
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold
                                    text-slate-600 dark:text-slate-300 mb-1.5">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {STATUS_VALUES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleFieldChange("status", s)}
                        className={`flex-1 py-2 rounded-xl text-xs font-display font-semibold
                          transition-all duration-200
                          ${formData.status === s
                            ? s === "pending"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-2 ring-amber-300 dark:ring-amber-700"
                              : s === "in-progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 ring-2 ring-blue-300 dark:ring-blue-700"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-2 ring-emerald-300 dark:ring-emerald-700"
                            : "bg-slate-100 dark:bg-night-600 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-night-500"
                          }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button onClick={onClose} disabled={isMutating} className="btn-ghost flex-1">
                Cancel
              </button>
              <button
                disabled={isMutating} // FIX 1: disabled during in-flight request
                onClick={() => {
                  if (!isDelete && !formData.title?.trim()) {
                    setTitleTouched(true);
                    return;
                  }
                  onSave();
                }}
                className={`flex-1 flex items-center justify-center gap-2
                  ${isDelete ? "btn-danger" : "btn-primary"}
                  disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {/* FIX 1: spinner feedback while saving */}
                {isMutating ? (
                  <><div className="spinner" /> {isDelete ? "Deleting…" : isEdit ? "Saving…" : "Adding…"}</>
                ) : isDelete ? (
                  "Delete"
                ) : isEdit ? (
                  <><Save size={14} /> Save</>
                ) : (
                  <><Plus size={14} /> Add</>
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