

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, CheckCircle2, Zap, Shield, BarChart2, Sun, Moon, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import Logo           from "../components/Logo";
import FormField      from "../components/FormField";
import PasswordInput  from "../components/PasswordInput";
import PageBackground from "../components/PageBackground";
import useAuth        from "../hooks/useAuth";
import { useTheme }   from "../context/ThemeContext";

const LOGIN_ORBS = [
  "w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-600/8 top-[-200px] left-[-150px] blur-3xl",
  "w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/8 bottom-[-100px] right-[-80px] blur-2xl",
  "w-[300px] h-[300px] bg-purple-500/8 top-[40%] right-[10%] blur-2xl",
];

const FEATURES = [
  { icon: Zap,          text: "Lightning-fast task management" },
  { icon: BarChart2,    text: "Real-time progress metrics"      },
  { icon: Shield,       text: "Secure JWT authentication"       },
  { icon: CheckCircle2, text: "Smart search & filtering"        },
];

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const { isDark, toggle }       = useTheme();
  const navigate = useNavigate();

  const [form,   setForm]   = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email.trim())                     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = "Invalid email";
    if (!form.password)                         e.password = "Password is required";
    return e;
  };

const handleSubmit = async (ev) => {
  ev.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});

  try {
    const result = await handleLogin(form);

    if (result.success) {
      toast.success("Welcome back! 👋");
      navigate("/");
    } else {
      toast.error(result.error || "Login failed");
    }
  } catch (err) {
    toast.error(typeof err === "string" ? err : "Login failed");
  }
};

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <PageBackground orbs={LOGIN_ORBS} />

      {/* ══════════════════════════ Navbar ══════════════════════════ */}
      <header className="sticky top-0 z-40 backdrop-blur-xl
                         bg-white/70 dark:bg-night-900/70
                         border-b border-slate-200/60 dark:border-white/8">
        {/*
          grid-cols-3 — left / center / right slots are equal width,
          so the Logo in the center column is always mathematically centred.
        */}
        <div className="h-14 px-4 sm:px-6 grid grid-cols-3 items-center max-w-7xl mx-auto w-full">

          {/* ── Left: Create account link ── */}
          <div className="flex justify-start">
            <Link
              to="/register"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
                         font-display font-medium
                         text-slate-600 dark:text-slate-300
                         hover:bg-black/[0.06] dark:hover:bg-white/10
                         hover:text-slate-900 dark:hover:text-white
                         transition-all duration-150">
              <UserPlus size={15} className="shrink-0" />
              <span className="hidden sm:inline">Create account</span>
            </Link>
          </div>

          {/* ── Center: Logo ── */}
          <div className="flex justify-center">
            <Logo size="sm" />
          </div>

          {/* ── Right: Theme toggle ── */}
          <div className="flex justify-end">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-xl
                         text-slate-600 dark:text-slate-300
                         hover:bg-black/[0.06] dark:hover:bg-white/10
                         hover:text-slate-900 dark:hover:text-white
                         transition-all duration-150">
              {isDark
                ? <Sun  size={17} className="text-amber-400" />
                : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════ Page body ══════════════════════════ */}
      <div className="flex-1 flex relative">

        {/* ── Left panel (desktop only) ── */}
        <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full
                            bg-gradient-to-br from-violet-600/5 via-transparent to-indigo-600/5" />
            <div className="absolute top-1/3 left-1/4 w-64 h-64
                            bg-violet-500/6 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48
                            bg-indigo-500/6 rounded-full blur-2xl animate-float"
                 style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="relative z-10 my-auto space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-violet-500/10 border border-violet-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-display font-semibold text-violet-500 tracking-wide">
                  Productivity Reimagined
                </span>
              </div>

              <h2 className="text-4xl xl:text-5xl font-display font-bold
                             text-slate-800 dark:text-white leading-tight tracking-tight">
                Manage tasks with{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text
                                   bg-gradient-to-r from-violet-500 to-indigo-500">
                    clarity
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full
                                   bg-gradient-to-r from-violet-500/40 to-indigo-500/40" />
                </span>
              </h2>

              <p className="text-base font-body text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                TaskFlow keeps your work organised, your team aligned, and your progress
                visible — all in one place.
              </p>
            </div>

            <ul className="space-y-3.5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/15
                                  flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-violet-500" />
                  </div>
                  <span className="text-sm font-body text-slate-600 dark:text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 p-4 rounded-2xl
                            bg-white/50 dark:bg-white/5
                            border border-slate-200/60 dark:border-white/8
                            backdrop-blur-sm">
              <div className="flex -space-x-2 shrink-0">
                {["bg-violet-400", "bg-indigo-400", "bg-purple-400", "bg-fuchsia-400"].map((c, i) => (
                  <div key={i}
                       className={`w-8 h-8 rounded-full ${c} border-2 border-white dark:border-night-800
                                   flex items-center justify-center text-white text-xs font-display font-bold`}>
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                      <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-body text-slate-500 dark:text-slate-400">
                  Loved by{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">2,000+</span>{" "}
                  productive teams
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div className="hidden lg:block w-px
                        bg-gradient-to-b from-transparent via-slate-200/60 dark:via-white/8 to-transparent
                        self-stretch my-8" />

        {/* ── Right panel: form ── */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm animate-slide-up">

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold
                             text-slate-800 dark:text-white tracking-tight">
                Welcome back 👋
              </h1>
              <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1.5">
                Sign in to continue to your workspace
              </p>
            </div>

            <div className="rounded-2xl
                            bg-white/70 dark:bg-white/[0.04]
                            border border-slate-200/80 dark:border-white/8
                            backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-black/20
                            p-7 space-y-5">

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <FormField label="Email Address" error={errors.email}>
                  <input
                    type="email" autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={`input ${errors.email ? "input-error" : ""}`}
                  />
                </FormField>

                <FormField label="Password" error={errors.password}>
                  <PasswordInput
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    autoComplete="current-password"
                    hasError={!!errors.password}
                  />
                </FormField>

                <button
                  type="submit" disabled={loading}
                  className="relative w-full py-3 px-4 rounded-xl font-display font-semibold text-sm
                             text-white overflow-hidden
                             bg-gradient-to-r from-violet-600 to-indigo-600
                             hover:from-violet-500 hover:to-indigo-500
                             disabled:opacity-60 disabled:cursor-not-allowed
                             shadow-lg shadow-violet-500/25 transition-all duration-200
                             flex items-center justify-center gap-2
                             focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2">
                  {!loading && (
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                                     translate-x-[-100%] hover:translate-x-[100%]
                                     transition-transform duration-700 ease-in-out" />
                  )}
                  {loading
                    ? <><div className="spinner" /> Signing in…</>
                    : <><LogIn size={16} /> Sign In</>}
                </button>
              </form>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
                <span className="text-xs font-body text-slate-400 dark:text-slate-500 shrink-0">
                  New to TaskFlow?
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
              </div>

              <Link
                to="/register"
                className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl
                           text-sm font-display font-semibold
                           text-slate-700 dark:text-slate-200
                           bg-slate-100 dark:bg-white/5
                           border border-slate-200/80 dark:border-white/8
                           hover:bg-slate-200 dark:hover:bg-white/10
                           transition-all duration-200">
                Create a free account
              </Link>
            </div>

            <p className="text-center text-xs font-body text-slate-400 dark:text-slate-500 mt-6">
              By signing in, you agree to our{" "}
              <span className="text-violet-500 cursor-pointer hover:underline">Terms</span>
              {" "}and{" "}
              <span className="text-violet-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;