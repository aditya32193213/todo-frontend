
import { memo } from "react";

const PageBackground = memo(({ orbs = [] }) => (
  <>
    {/* Base gradient defined in global CSS (.page-bg) */}
    <div className="page-bg" />

    {/* Grid / dot pattern defined in global CSS (.grid-overlay) */}
    <div className="grid-overlay" />

    {/* Coloured glow orbs — each class positions & colours them */}
    {orbs.map((cls) => (
      <div key={cls} className={`orb ${cls}`} />
    ))}

    {/* Fine noise texture — adds a premium, film-grain feel */}
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.028] dark:opacity-[0.045]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "192px 192px",
      }}
    />

    {/* Radial vignette — darkens edges to draw focus inward */}
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.10) 100%)",
      }}
    />
  </>
));

PageBackground.displayName = "PageBackground";
export default PageBackground;