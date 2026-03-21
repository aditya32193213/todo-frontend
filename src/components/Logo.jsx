import { useId } from "react";


const Logo = ({ size = "md", showText = true }) => {
  const uid    = useId().replace(/:/g, ""); 
  const gradId = `logo-grad-${uid}`;

  const cfg = {
    sm: { icon: 28, text: "text-base" },
    md: { icon: 36, text: "text-xl"  },
    lg: { icon: 46, text: "text-2xl" },
  }[size] || { icon: 36, text: "text-xl" };

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg width={cfg.icon} height={cfg.icon} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill={`url(#${gradId})`} />
        <rect x="9"  y="11" width="13" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)" />
        <rect x="9"  y="18" width="10" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)" />
        <rect x="9"  y="25" width="7"  height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)" />
        <circle cx="28" cy="26" r="7" fill="rgba(255,255,255,0.15)" />
        <path d="M24.8 26.2l2.2 2.3 4.2-4.6" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {showText && (
        <span className={`font-display font-bold ${cfg.text} text-slate-800 dark:text-white tracking-tight`}>
          Task<span className="text-violet-500">Flow</span>
        </span>
      )}
    </div>
  );
};

export default Logo;