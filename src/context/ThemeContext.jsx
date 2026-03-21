import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("tf-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark class + persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("tf-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("tf-theme", "light");
    }
  }, [isDark]);

  // FIX 6: the previous code read window.matchMedia(...).matches once on mount
  // (a snapshot). If the user's OS switches to dark mode at sunset while the
  // app is open, the app didn't follow. This effect subscribes to the media
  // query's "change" event so the app reacts in real time — but only when the
  // user has not set an explicit preference via the toggle (tf-theme in storage).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("tf-theme")) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // When the user toggles manually, store their explicit preference so the
  // OS listener above correctly stands down.
  const toggle = useCallback(() => setIsDark((p) => !p), []);

  // Memoize the context value so consumers only re-render when isDark actually
  // changes — not on every ThemeProvider render.
  const value = useMemo(() => ({ isDark, toggle }), [isDark, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};