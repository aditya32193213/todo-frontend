import { memo } from "react";

const PageBackground = memo(({ orbs = [] }) => (
  <>
    <div className="page-bg" />
    <div className="grid-overlay" />
    {orbs.map((cls) => (
      <div key={cls} className={`orb ${cls}`} />
    ))}
  </>
));

PageBackground.displayName = "PageBackground";
export default PageBackground;