import { useId, useEffect, cloneElement, Children } from "react";

/* ─── Inject field animation styles once ────────────────────────────────────── */
let ffStylesReady = false;
function ensureStyles() {
  if (ffStylesReady || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = `
    @keyframes ff-err-in {
      from { opacity: 0; transform: translateY(-5px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0)   scale(1);     }
    }
    .ff-err { animation: ff-err-in 0.22s cubic-bezier(0.23,1,0.32,1) both; }
  `;
  document.head.appendChild(tag);
  ffStylesReady = true;
}

/* ─── Inline SVG icons ───────────────────────────────────────────────────────── */
const AlertIcon = () => (
  <svg
    width="12" height="12" viewBox="0 0 12 12"
    fill="currentColor" className="shrink-0 mt-px"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd" clipRule="evenodd"
      d="M6 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM.75 6a5.25 5.25 0 1 1 10.5 0A5.25 5.25 0 0 1 .75 6Zm5.25-2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 6 4Zm0 5a.875.875 0 1 0 0-1.75A.875.875 0 0 0 6 9Z"
    />
  </svg>
);

/* ─── Component ─────────────────────────────────────────────────────────────── */
const FormField = ({ label, error, children, required = false }) => {
  const autoId = useId();
  const child = Children.only(children);
  const childWithId = cloneElement(child, { id: autoId });

  useEffect(() => { ensureStyles(); }, []);

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label */}
      <label
        htmlFor={autoId}
        className="inline-flex items-center gap-0.5
                   text-[11px] font-display font-semibold tracking-wider uppercase
                   text-slate-500 dark:text-slate-400
                   transition-colors duration-200"
      >
        {label}
        {required && (
          <span
            className="text-violet-500 dark:text-violet-400 text-[13px] leading-none ml-0.5"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {/* Input slot */}
      <div className={`transition-all duration-200 ${error ? "scale-[0.995] origin-left" : ""}`}>
        {childWithId}
      </div>

      {/* Error message */}
      {error && (
        <p
          key={error}             /* re-triggers animation when message changes */
          className="ff-err flex items-start gap-1.5 text-xs text-red-500
                     dark:text-red-400 font-body leading-snug"
          role="alert"
        >
          <AlertIcon />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormField;