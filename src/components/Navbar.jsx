import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun, Moon, LogOut, User, ChevronDown,
  Zap, Menu, X, Settings, ShieldCheck,
} from "lucide-react";
import Logo      from "./Logo";
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

  /* Close dropdown on Escape */
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
    <header
      className="sticky top-0 z-40
                 backdrop-blur-xl
                 bg-white/75 dark:bg-night-900/75
                 border-b border-slate-200/60 dark:border-white/8
                 shadow-sm shadow-slate-900/[0.04]"
    >
      <div
        className="px-4 sm:px-6 flex items-center justify-between gap-3"
        style={{ height: "60px" }}
      >

        {/* ── Left: hamburger + logo ──────────────────────────────── */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onMobileMenuToggle}
            aria-label="Toggle sidebar"
            className="lg:hidden p-2 rounded-xl
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-white/8
                       transition-all duration-200"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <Logo size="md" />
        </div>

        {/* ── Right: actions ──────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Seed button */}
          <button
            onClick={onSeed}
            disabled={seeding}
            title="Seed sample tasks"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       text-xs font-display font-semibold
                       text-violet-600 dark:text-violet-400
                       bg-violet-50 dark:bg-violet-500/10
                       border border-violet-200/60 dark:border-violet-500/20
                       hover:bg-violet-100 dark:hover:bg-violet-500/20
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            <Zap
              size={13}
              className={seeding ? "animate-spin text-violet-500" : "text-violet-500"}
            />
            {seeding ? "Seeding…" : "Seed Tasks"}
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5" />

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-xl
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-white/8
                       transition-all duration-200"
          >
            {isDark
              ? <Sun  size={17} className="text-amber-400" />
              : <Moon size={17} />}
          </button>

          {/* ── User menu ───────────────────────────────────────────── */}
          <div className="relative">

            {/* Trigger — NO group class, name stays white at all times in dark mode */}
            <button
              onClick={() => setDropOpen((p) => !p)}
              aria-expanded={dropOpen}
              aria-haspopup="menu"
              aria-label="User menu"
              className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl
                          transition-all duration-200
                          ${dropOpen
                            ? "bg-slate-100 dark:bg-white/10"
                            : "hover:bg-slate-100 dark:hover:bg-white/10"}`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-7 h-7 rounded-full
                              bg-gradient-to-br from-violet-500 to-indigo-600
                              flex items-center justify-center
                              text-white text-xs font-display font-bold
                              ring-2 ring-violet-500/20"
                >
                  {initials}
                </div>
                {/* Online dot */}
                <span
                  className="absolute -bottom-0.5 -right-0.5
                             w-2.5 h-2.5 rounded-full bg-emerald-400
                             border-2 border-white dark:border-night-900"
                />
              </div>

              {/* Name */}
              <span
                className="hidden sm:block text-sm font-display font-medium
                           text-slate-800 dark:text-white
                           max-w-[110px] truncate"
              >
                {user?.name || "User"}
              </span>

              {/* Chevron */}
              <ChevronDown
                size={13}
                className={`hidden sm:block text-slate-400 dark:text-slate-300
                            transition-transform duration-200
                            ${dropOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* ── Dropdown ────────────────────────────────────────── */}
            {dropOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropOpen(false)}
                />

                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2.5 w-60 z-20
                             rounded-2xl overflow-hidden
                             bg-white dark:bg-night-800
                             border border-slate-200/80 dark:border-white/10
                             shadow-xl shadow-slate-900/10 dark:shadow-black/30
                             animate-slide-up"
                >
                  {/* User info header */}
                  <div
                    className="px-4 py-3.5
                                bg-gradient-to-br from-violet-50 to-indigo-50/50
                                dark:from-violet-500/20 dark:to-indigo-500/12
                                border-b border-slate-200/60 dark:border-white/12"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl shrink-0
                                   bg-gradient-to-br from-violet-500 to-indigo-600
                                   flex items-center justify-center
                                   text-white text-sm font-display font-bold
                                   shadow-md shadow-violet-500/25"
                      >
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-display font-bold
                                      text-slate-800 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div
                      className="inline-flex items-center gap-1.5 mt-2.5
                                 px-2 py-1 rounded-full
                                 bg-emerald-50 dark:bg-emerald-500/15
                                 border border-emerald-200/60 dark:border-emerald-500/30"
                    >
                      <ShieldCheck size={10} className="text-emerald-500" />
                      <span className="text-xs font-display font-semibold
                                       text-emerald-600 dark:text-emerald-400">
                        Verified account
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-1.5 space-y-0.5">
                    <button
                      role="menuitem"
                      onClick={() => { setDropOpen(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                 text-slate-700 dark:text-white
                                 hover:bg-slate-100 dark:hover:bg-white/10
                                 transition-all duration-150 group"
                    >
                      <div
                        className="w-7 h-7 rounded-lg
                                   bg-slate-100 dark:bg-white/20
                                   flex items-center justify-center shrink-0
                                   group-hover:bg-violet-100 dark:group-hover:bg-violet-500/30
                                   transition-colors duration-150"
                      >
                        <User
                          size={13}
                          className="text-slate-500 dark:text-slate-100
                                     group-hover:text-violet-500 transition-colors duration-150"
                        />
                      </div>
                      <span className="font-display font-medium">My Profile</span>
                    </button>

                    {/* <button
                      role="menuitem"
                      onClick={() => { setDropOpen(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                 text-slate-700 dark:text-white
                                 hover:bg-slate-100 dark:hover:bg-white/10
                                 transition-all duration-150 group"
                    >
                      <div
                        className="w-7 h-7 rounded-lg
                                   bg-slate-100 dark:bg-white/20
                                   flex items-center justify-center shrink-0
                                   group-hover:bg-violet-100 dark:group-hover:bg-violet-500/30
                                   transition-colors duration-150"
                      >
                        <Settings
                          size={13}
                          className="text-slate-500 dark:text-slate-100
                                     group-hover:text-violet-500 transition-colors duration-150"
                        />
                      </div>
                      <span className="font-display font-medium">Settings</span>
                    </button> */}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100 dark:bg-white/15 mx-1.5" />

                  {/* Logout */}
                  <div className="p-1.5">
                    <button
                      role="menuitem"
                      onClick={onLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                 text-red-500 dark:text-red-400
                                 hover:bg-red-50 dark:hover:bg-red-500/15
                                 disabled:opacity-60 disabled:cursor-not-allowed
                                 transition-all duration-150 group"
                    >
                      <div
                        className="w-7 h-7 rounded-lg
                                   bg-red-50 dark:bg-red-500/25
                                   flex items-center justify-center shrink-0"
                      >
                        <LogOut
                          size={13}
                          className={`text-red-400 dark:text-red-300 ${isLoggingOut ? "animate-spin" : ""}`}
                        />
                      </div>
                      <span className="font-display font-semibold">
                        {isLoggingOut ? "Signing out…" : "Sign Out"}
                      </span>
                    </button>
                  </div>
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