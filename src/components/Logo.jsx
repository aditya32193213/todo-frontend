import { useId } from "react";

const Logo = ({ size = "md", showText = true }) => {
  const uid    = useId().replace(/:/g, "");
  const gradId = `logo-grad-${uid}`;
  const innerGradId = `logo-inner-${uid}`;

  const cfg = {
    sm: { icon: 28, text: "text-base", gap: "gap-2",   glow: "w-7 h-7"   },
    md: { icon: 36, text: "text-xl",   gap: "gap-2.5", glow: "w-9 h-9"   },
    lg: { icon: 46, text: "text-2xl",  gap: "gap-3",   glow: "w-12 h-12" },
  }[size] || { icon: 36, text: "text-xl", gap: "gap-2.5", glow: "w-9 h-9" };

  return (
    <div className={`flex items-center ${cfg.gap} select-none group cursor-default`}>

      {/* Icon + glow wrapper */}
      <div className="relative flex items-center justify-center">

        {/* Ambient glow — sits behind the icon */}
        <div
          className={`absolute ${cfg.glow} rounded-xl bg-violet-500/40
                      blur-lg opacity-70 scale-110
                      group-hover:opacity-100 group-hover:scale-125
                      transition-all duration-500 ease-out`}
        />

        <svg
          width={cfg.icon}
          height={cfg.icon}
          viewBox="0 0 40 40"
          fill="none"
          className="relative z-10 transition-transform duration-300 ease-out
                     group-hover:scale-[1.06] drop-shadow-sm"
        >
          <defs>
            {/* Main background gradient */}
            <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4c1d95" />
              <stop offset="0.4" stopColor="#6d28d9" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
            {/* Subtle inner top sheen */}
            <linearGradient id={innerGradId} x1="20" y1="0" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.18)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Base shape */}
          <rect width="40" height="40" rx="11" fill={`url(#${gradId})`} />

          {/* Inner top highlight */}
          <rect x="1" y="1" width="38" height="22" rx="10.2"
                fill={`url(#${innerGradId})`} />

          {/* Subtle border ring */}
          <rect x="0.5" y="0.5" width="39" height="39" rx="10.6"
                stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" />

          {/* Task list lines — decreasing opacity creates depth */}
          <rect x="9"    y="11"   width="14"   height="2.4" rx="1.2" fill="rgba(255,255,255,0.5)" />
          <rect x="9"    y="17.5" width="10.5" height="2.4" rx="1.2" fill="rgba(255,255,255,0.32)" />
          <rect x="9"    y="24"   width="7"    height="2.4" rx="1.2" fill="rgba(255,255,255,0.2)" />

          {/* Check-badge backdrop */}
          <circle cx="28" cy="26" r="7.5" fill="rgba(255,255,255,0.15)" />
          <circle cx="28" cy="26" r="7.5"
                  stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" fill="none" />

          {/* Checkmark */}
          <path d="M24.4 26.1l2.7 2.7 4.5-5.3"
                stroke="white" strokeWidth="2.1"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <span className={`font-display font-bold ${cfg.text} tracking-tight leading-none`}>
          <span className="text-slate-800 dark:text-white transition-colors">
            Task
          </span>
          <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400
                           dark:from-violet-400 dark:via-violet-400 dark:to-violet-300
                           bg-clip-text text-transparent">
            Flow
          </span>
        </span>
      )}
    </div>
  );
};

export default Logo;