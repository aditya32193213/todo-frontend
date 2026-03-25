import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, User, Mail, Lock, Save,
  ShieldCheck, Sun, Moon, KeyRound,
  ChevronRight, Sparkles, LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

import Logo          from "../components/Logo";
import FormField     from "../components/FormField";
import PasswordInput from "../components/PasswordInput";
import PageBackground from "../components/PageBackground";
import { useTheme }  from "../context/ThemeContext";
import { useAuth }   from "../context/AuthContext";

const PROFILE_ORBS = [
  "w-[500px] h-[500px] bg-violet-400/8 dark:bg-violet-600/8 top-[-150px] right-[-100px] blur-3xl",
  "w-[350px] h-[350px] bg-indigo-500/6 dark:bg-indigo-600/6 bottom-[-100px] left-[-80px] blur-3xl",
  "w-[250px] h-[250px] bg-purple-400/5 top-[40%] right-[20%] blur-2xl",
];

const Profile = () => {
  const { isDark, toggle }                                      = useTheme();
  const { user, profileLoading: loading, handleUpdatePassword, handleLogout } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.currentPassword)                     e.currentPassword = "Current password is required";
    if (!form.newPassword)                         e.newPassword     = "New password is required";
    else if (form.newPassword.length < 6)          e.newPassword     = "Minimum 6 characters";
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (form.currentPassword === form.newPassword && form.newPassword)
                                                   e.newPassword     = "New password must differ from current";
    return e;
  };

  const handlePasswordSave = async (ev) => {
  ev.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});

  try {
    const result = await handleUpdatePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    if (result.success) {
      toast.success("Password updated successfully ✅");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error(result.error || "Failed to update password");
    }
  } catch (err) {
    toast.error(err?.message || "Failed to update password");
  }
};

  return (
    <div className="min-h-screen flex flex-col relative">
      <PageBackground orbs={PROFILE_ORBS} />

      {/* ── Sticky top bar ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl
                         bg-white/70 dark:bg-night-900/70
                         border-b border-slate-200/60 dark:border-white/8">
        <div className="h-14 px-4 sm:px-6 flex items-center justify-between max-w-3xl mx-auto w-full">

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
                         font-display font-medium
                         text-slate-500 dark:text-slate-400
                         hover:bg-slate-100 dark:hover:bg-white/8
                         transition-all duration-200 group">
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>

          <Logo size="sm" />

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-white/8
                       transition-all duration-200">
            {isDark
              ? <Sun size={17} className="text-amber-400" />
              : <Moon size={17} />}
          </button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 relative z-10 px-4 py-8 max-w-3xl mx-auto w-full space-y-6">

        {/* Page heading */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold
                           text-slate-800 dark:text-white tracking-tight">
              Account Settings
            </h1>
            <Sparkles size={18} className="text-violet-400" />
          </div>
          <p className="text-sm font-body text-slate-400 dark:text-slate-500">
            Manage your profile and security preferences
          </p>
        </div>

        {/* ── Profile hero card ───────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden animate-slide-up
                        border border-slate-200/60 dark:border-white/8">

          {/* Gradient banner */}
          <div className="h-24 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600
                          bg-[length:200%_100%]" />

          {/* Avatar — overlapping the banner */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-9 mb-5">
              <div className="relative">
                <div className="w-[72px] h-[72px] rounded-2xl
                                bg-gradient-to-br from-violet-400 to-indigo-600
                                flex items-center justify-center
                                text-white text-2xl font-display font-bold
                                shadow-xl shadow-violet-500/30
                                border-4 border-white dark:border-night-900
                                ring-2 ring-violet-500/20">
                  {initials}
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full
                                 bg-emerald-400 border-2 border-white dark:border-night-900" />
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                           text-xs font-display font-semibold
                           text-red-500 dark:text-red-400
                           bg-red-50 dark:bg-red-500/10
                           border border-red-200/60 dark:border-red-500/20
                           hover:bg-red-100 dark:hover:bg-red-500/20
                           transition-all duration-200">
                <LogOut size={12} />
                Sign out
              </button>
            </div>

            {/* Name + email + badge */}
            <div className="space-y-1 mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white">
                  {user?.name || "User"}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                 text-xs font-display font-semibold
                                 bg-emerald-50 dark:bg-emerald-500/10
                                 text-emerald-600 dark:text-emerald-400
                                 border border-emerald-200/60 dark:border-emerald-500/20">
                  <ShieldCheck size={10} />
                  Verified
                </span>
              </div>
              <p className="text-sm font-body text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>

            {/* Info rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5
                            pt-5 border-t border-slate-100 dark:border-white/8">
              {[
                { icon: User, label: "Full Name",      value: user?.name  },
                { icon: Mail, label: "Email Address",  value: user?.email },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                             bg-slate-50 dark:bg-white/[0.03]
                             border border-slate-200/60 dark:border-white/6">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/15
                                  flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-violet-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-display font-semibold
                                  text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="text-sm font-body text-slate-700 dark:text-slate-200 mt-0.5 truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Change password card ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200/60 dark:border-white/8
                        bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm
                        animate-slide-up overflow-hidden">

          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4
                          border-b border-slate-100 dark:border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/15
                              flex items-center justify-center">
                <KeyRound size={14} className="text-violet-500" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-slate-800 dark:text-white">
                  Change Password
                </h3>
                <p className="text-xs font-body text-slate-400 dark:text-slate-500 mt-0.5">
                  Keep your account secure with a strong password
                </p>
              </div>
            </div>
            <Lock size={14} className="text-slate-300 dark:text-slate-600 shrink-0" />
          </div>

          {/* Form */}
          <div className="px-6 py-5">
            <form onSubmit={handlePasswordSave} className="space-y-4" noValidate>

              <FormField label="Current Password" error={errors.currentPassword}>
                <PasswordInput
                  value={form.currentPassword}
                  onChange={set("currentPassword")}
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  hasError={!!errors.currentPassword}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="New Password" error={errors.newPassword}>
                  <PasswordInput
                    value={form.newPassword}
                    onChange={set("newPassword")}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    hasError={!!errors.newPassword}
                  />
                </FormField>

                <FormField label="Confirm New Password" error={errors.confirmPassword}>
                  <PasswordInput
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                    hasError={!!errors.confirmPassword}
                  />
                </FormField>
              </div>

              {/* Password strength hint */}
              <p className="text-xs font-body text-slate-400 dark:text-slate-500
                            flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-violet-400 shrink-0" />
                Use at least 6 characters with a mix of letters and numbers
              </p>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 px-4 rounded-xl mt-2
                           font-display font-semibold text-sm text-white
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           hover:from-violet-500 hover:to-indigo-500
                           disabled:opacity-60 disabled:cursor-not-allowed
                           shadow-lg shadow-violet-500/25
                           transition-all duration-200 overflow-hidden
                           flex items-center justify-center gap-2
                           focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2">
                {/* Shimmer */}
                {!loading && (
                  <span className="absolute inset-0 bg-gradient-to-r
                                   from-white/0 via-white/10 to-white/0
                                   translate-x-[-100%] hover:translate-x-[100%]
                                   transition-transform duration-700 ease-in-out" />
                )}
                {loading
                  ? <><div className="spinner" /> Saving…</>
                  : <><Save size={15} /> Update Password</>}
              </button>
            </form>
          </div>
        </div>

        {/* ── Quick nav footer ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200/60 dark:border-white/8
                        bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm
                        divide-y divide-slate-100 dark:divide-white/8
                        animate-slide-up overflow-hidden">
          <Link
            to="/"
            className="flex items-center justify-between px-5 py-4 group
                       hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/8
                              flex items-center justify-center">
                <ChevronRight size={14} className="text-slate-500 dark:text-slate-400
                                                   -rotate-180" />
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
                  Back to Dashboard
                </p>
                <p className="text-xs font-body text-slate-400 dark:text-slate-500 mt-0.5">
                  View and manage your tasks
                </p>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-slate-300 dark:text-slate-600
                         group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>

      </main>
    </div>
  );
};

export default Profile;