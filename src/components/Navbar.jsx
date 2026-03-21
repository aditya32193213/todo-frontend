import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, User, ChevronDown, Zap, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../context/ThemeContext";
import { useAuth }  from "../context/AuthContext";

const Navbar = memo(({ onSeed, seeding, onMobileMenuToggle, mobileMenuOpen }) => {
  const { isDark, toggle }     = useTheme();
  const { user, handleLogout } = useAuth();
  const navigate               = useNavigate();

  const [dropOpen,     setDropOpen]     = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = useMemo(() =>
    user?.name
      ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U",
  [user?.name]);

  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e) => { if (e.key === "Escape") setDropOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dropOpen]);

  const onLogout = useCallback(async () => {
    setDropOpen(false);
    setIsLoggingOut(true);
    try {
      await handleLogout();
    } finally {
      setIsLoggingOut(false);
    }
  }, [handleLogout]);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/20 dark:border-night-600/50">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">

        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            aria-label="Toggle sidebar"
            className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Logo size="md" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">

          <button
            onClick={onSeed}
            disabled={seeding}
            title="Seed sample tasks"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       text-xs font-display font-semibold
                       bg-violet-50 dark:bg-violet-900/20
                       text-violet-600 dark:text-violet-400
                       hover:bg-violet-100 dark:hover:bg-violet-900/40
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            <Zap size={13} className={seeding ? "animate-spin" : ""} />
            {seeding ? "Seeding…" : "Seed Tasks"}
          </button>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200"
          >
            {isDark
              ? <Sun  size={18} className="text-amber-400" />
              : <Moon size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setDropOpen((p) => !p)}
              aria-expanded={dropOpen}
              aria-haspopup="menu"
              aria-label="User menu"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl
                         hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-700
                              flex items-center justify-center text-white
                              text-xs font-display font-bold shrink-0">
                {initials}
              </div>
              <span className="hidden sm:block text-sm font-display font-medium
                               text-slate-700 dark:text-slate-200 max-w-[110px] truncate">
                {user?.name || "User"}
              </span>
              <ChevronDown
                size={14}
                className={`hidden sm:block text-slate-400 transition-transform duration-200
                            ${dropOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />

                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-56 z-20
                              glass rounded-2xl shadow-3d
                              border border-white/20 dark:border-night-500/50
                              overflow-hidden animate-slide-up"
                >
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-night-600">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-700
                                      flex items-center justify-center text-white
                                      text-sm font-display font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-display font-semibold
                                      text-slate-800 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    role="menuitem"
                    onClick={() => { setDropOpen(false); navigate("/profile"); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                               text-slate-600 dark:text-slate-300
                               hover:bg-slate-50 dark:hover:bg-night-600
                               transition-colors duration-150"
                  >
                    <User size={14} />
                    <span className="font-body">My Profile</span>
                  </button>

                  <button
                    role="menuitem"
                    onClick={onLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                               text-red-500 dark:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-900/20
                               disabled:opacity-60 disabled:cursor-not-allowed
                               transition-colors duration-150"
                  >
                    <LogOut size={14} className={isLoggingOut ? "animate-spin" : ""} />
                    <span className="font-body font-medium">
                      {isLoggingOut ? "Logging out…" : "Logout"}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;