import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Sparkles, CheckCircle, ArrowRight, Sun, Moon, LogIn } from "lucide-react";
import toast from "react-hot-toast";

import Logo           from "../components/Logo";
import FormField      from "../components/FormField";
import PasswordInput  from "../components/PasswordInput";
import PageBackground from "../components/PageBackground";
import useAuth        from "../hooks/useAuth";
import { useTheme }   from "../context/ThemeContext";

const REGISTER_ORBS = [
  "w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-600/8 top-[-200px] right-[-150px] blur-3xl",
  "w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/8 bottom-[-100px] left-[-80px] blur-2xl",
  "w-[280px] h-[280px] bg-purple-500/8 top-[30%] left-[15%] blur-2xl",
];

const STEPS = [
  { step: "01", title: "Create your account",  desc: "Fill in your details — takes under 30 seconds."   },
  { step: "02", title: "Add your first tasks",  desc: "Seed sample data or start from scratch instantly." },
  { step: "03", title: "Track your progress",   desc: "Watch your metrics update in real time."           },
];

const PERKS = [
  "No credit card required",
  "Free forever on the starter plan",
  "Cancel or upgrade anytime",
];

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const { isDark, toggle }          = useTheme();
  const navigate = useNavigate();

  const [form,   setForm]   = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())                       e.name     = "Name is required";
    else if (form.name.trim().length < 2)        e.name     = "At least 2 characters";
    if (!form.email.trim())                      e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))  e.email    = "Invalid email";
    if (!form.password)                          e.password = "Password is required";
    else if (form.password.length < 6)           e.password = "Minimum 6 characters";
    if (form.password !== form.confirm)          e.confirm  = "Passwords don't match";
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
  const result = await handleRegister({
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password,
  });

  if (result.success) {
    toast.success("Account created! Please sign in 🎉");
    navigate("/login");
  } else {
    toast.error(result.error || "Registration failed");
  }
} catch (err) {
  toast.error(err?.message || "Registration failed");
};


  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <PageBackground orbs={REGISTER_ORBS} />

      {/* ══════════════════════════ Navbar ══════════════════════════ */}
      <header className="sticky top-0 z-40 backdrop-blur-xl
                         bg-white/70 dark:bg-night-900/70
                         border-b border-slate-200/60 dark:border-white/8">
        {/*
          grid-cols-3 — left / center / right slots are equal width,
          so the Logo in the center column is always mathematically centred.
        */}
        <div className="h-14 px-4 sm:px-6 grid grid-cols-3 items-center max-w-7xl mx-auto w-full">

          {/* ── Left: Sign in link ── */}
          <div className="flex justify-start">
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
                         font-display font-medium
                         text-slate-600 dark:text-slate-300
                         hover:bg-black/[0.06] dark:hover:bg-white/10
                         hover:text-slate-900 dark:hover:text-white
                         transition-all duration-150">
              <LogIn size={15} className="shrink-0" />
              <span className="hidden sm:inline">Sign in</span>
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
            <div className="absolute top-1/4 right-1/4 w-72 h-72
                            bg-violet-500/6 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48
                            bg-indigo-500/6 rounded-full blur-2xl animate-float"
                 style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative z-10 my-auto space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-violet-500/10 border border-violet-500/20">
                <Sparkles size={12} className="text-violet-400" />
                <span className="text-xs font-display font-semibold text-violet-500 tracking-wide">
                  Get started for free
                </span>
              </div>

              <h2 className="text-4xl xl:text-5xl font-display font-bold
                             text-slate-800 dark:text-white leading-tight tracking-tight">
                Start your journey{" "}
                <span className="block relative">
                  <span className="text-transparent bg-clip-text
                                   bg-gradient-to-r from-violet-500 to-indigo-500">
                    to productivity
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full
                                   bg-gradient-to-r from-violet-500/40 to-indigo-500/40" />
                </span>
              </h2>

              <p className="text-base font-body text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                Join thousands of teams who use TaskFlow to stay on top of what matters most.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-display font-semibold text-slate-400 dark:text-slate-500
                            uppercase tracking-widest">
                How it works
              </p>
              {STEPS.map(({ step, title, desc }, i) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20
                                    flex items-center justify-center">
                      <span className="text-xs font-display font-bold text-violet-500">{step}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px h-6 mt-1 bg-gradient-to-b from-violet-500/20 to-transparent" />
                    )}
                  </div>
                  <div className="pt-1 pb-2">
                    <p className="text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
                      {title}
                    </p>
                    <p className="text-xs font-body text-slate-500 dark:text-slate-400 mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-4 rounded-2xl
                            bg-white/50 dark:bg-white/5
                            border border-slate-200/60 dark:border-white/8
                            backdrop-blur-sm space-y-2.5">
              <p className="text-xs font-display font-semibold text-slate-500 dark:text-slate-400
                            uppercase tracking-wider">
                Always included
              </p>
              {PERKS.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-sm font-body text-slate-600 dark:text-slate-300">{perk}</span>
                </div>
              ))}
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
                Create your account ✨
              </h1>
              <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1.5">
                Free forever. No credit card needed.
              </p>
            </div>

            <div className="rounded-2xl
                            bg-white/70 dark:bg-white/[0.04]
                            border border-slate-200/80 dark:border-white/8
                            backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-black/20
                            p-7 space-y-5">

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <FormField label="Full Name" error={errors.name}>
                  <input
                    type="text" autoComplete="name"
                    value={form.name} onChange={set("name")}
                    placeholder="John Doe"
                    className={`input ${errors.name ? "input-error" : ""}`}
                  />
                </FormField>

                <FormField label="Email Address" error={errors.email}>
                  <input
                    type="email" autoComplete="email"
                    value={form.email} onChange={set("email")}
                    placeholder="you@example.com"
                    className={`input ${errors.email ? "input-error" : ""}`}
                  />
                </FormField>

                <FormField label="Password" error={errors.password}>
                  <PasswordInput
                    value={form.password} onChange={set("password")}
                    placeholder="Min. 6 characters" autoComplete="new-password"
                    hasError={!!errors.password}
                  />
                </FormField>

                <FormField label="Confirm Password" error={errors.confirm}>
                  <PasswordInput
                    value={form.confirm} onChange={set("confirm")}
                    placeholder="Re-enter password" autoComplete="new-password"
                    hasError={!!errors.confirm}
                  />
                </FormField>

                <button
                  type="submit" disabled={loading}
                  className="relative w-full py-3 px-4 rounded-xl font-display font-semibold text-sm
                             text-white overflow-hidden mt-2
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
                    ? <><div className="spinner" /> Creating account…</>
                    : <><UserPlus size={16} /> Create Account</>}
                </button>
              </form>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
                <span className="text-xs font-body text-slate-400 dark:text-slate-500 shrink-0">
                  Already have an account?
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
              </div>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl
                           text-sm font-display font-semibold
                           text-slate-700 dark:text-slate-200
                           bg-slate-100 dark:bg-white/5
                           border border-slate-200/80 dark:border-white/8
                           hover:bg-slate-200 dark:hover:bg-white/10
                           transition-all duration-200 group">
                Sign in instead
                <ArrowRight size={14}
                  className="text-slate-400 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            <p className="text-center text-xs font-body text-slate-400 dark:text-slate-500 mt-6">
              By creating an account, you agree to our{" "}
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
}
export default Register;