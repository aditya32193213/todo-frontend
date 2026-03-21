import { memo } from "react";

// React.memo: PageBackground receives module-level constant arrays from each
// page, so its props are referentially stable across re-renders — memo ensures
// it never re-renders unless the orb config actually changes.
//
// FIX: key changed from the array index `i` to the class string `cls`.
// The class string is unique within each page's orb array, making it a stable
// and semantically meaningful key. Using the array index as a key causes React
// to re-mount elements when the array is re-ordered, and also triggers the
// react/no-array-index-key ESLint warning.

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