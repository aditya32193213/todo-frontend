import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

/* ─── Inject toggle animation once ──────────────────────────────────────────── */
let piStylesReady = false;
function ensureStyles() {
  if (piStylesReady || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = `
    @keyframes pi-icon-in {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6) rotate(-15deg); }
      60%  { opacity: 1; transform: translate(-50%, -50%) scale(1.12) rotate(4deg);  }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1)    rotate(0deg);  }
    }
    .pi-icon-enter {
      animation: pi-icon-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
  `;
  document.head.appendChild(tag);
  piStylesReady = true;
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
const PasswordInput = ({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  hasError = false,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const [iconKey, setIconKey] = useState(0); /* bump to re-trigger animation */

  useEffect(() => { ensureStyles(); }, []);

  const handleToggle = () => {
    setShow((prev) => !prev);
    setIconKey((k) => k + 1); /* re-mount icon → fresh animation every click */
  };

  const IconComponent = show ? EyeOff : Eye;

  return (
    <div className="relative group">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input pr-11 ${hasError ? "input-error" : ""}`}
        {...rest}
      />

      {/* Toggle button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        className="absolute right-0 top-0 h-full w-11
                   flex items-center justify-center
                   text-slate-400 dark:text-slate-500
                   hover:text-slate-600 dark:hover:text-slate-300
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-violet-500/40 focus-visible:ring-offset-1
                   rounded-r-[inherit] transition-colors duration-150"
      >
        {/* Absolutely-positioned icon — re-keyed to animate on every toggle */}
        <span
          key={iconKey}
          className="pi-icon-enter absolute left-1/2 top-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          <IconComponent size={16} strokeWidth={2} />
        </span>
      </button>
    </div>
  );
};

export default PasswordInput;