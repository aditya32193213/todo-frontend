import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Save, ShieldCheck, Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";

import Logo           from "../components/Logo";
import FormField      from "../components/FormField";
import PasswordInput  from "../components/PasswordInput";
import PageBackground from "../components/PageBackground"; // FIX 7
import { useTheme }   from "../context/ThemeContext";
import { useAuth }    from "../context/AuthContext";

const PROFILE_ORBS = [
  "w-80 h-80 bg-violet-400/20 top-[-80px] right-[-60px]",
  "w-64 h-64 bg-violet-600/15 bottom-[-60px] left-[-50px]",
];

const Profile = () => {
  const { isDark, toggle }                        = useTheme();
  const { user, profileLoading: loading, handleUpdatePassword } = useAuth();

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
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await handleUpdatePassword({
      currentPassword: form.currentPassword,
      newPassword:     form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    if (result.success) {
      toast.success("Password updated successfully ✅");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error(result.error || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <PageBackground orbs={PROFILE_ORBS} />

      {/* Minimal top bar */}
      <header className="sticky top-0 z-40 glass border-b border-white/20 dark:border-night-600/50">
        <div className="h-14 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                         hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200">
              <ArrowLeft size={18} />
            </Link>
            <Logo size="sm" />
          </div>
          <button onClick={toggle} aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-night-600 transition-all duration-200">
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="flex-1 relative z-10 px-4 py-8 max-w-2xl mx-auto w-full">
        <div className="mb-7 animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
            My Profile
          </h1>
          <p className="text-sm font-body text-slate-400 mt-0.5">Manage your account details</p>
        </div>

        {/* Profile card */}
        <div className="glass-card p-6 mb-5 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-700
                            flex items-center justify-center text-white
                            text-2xl font-display font-bold shrink-0 shadow-glow">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-display font-bold text-slate-800 dark:text-white truncate">
                {user?.name || "User"}
              </h2>
              <p className="text-sm font-body text-slate-400 truncate">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-xs font-body text-emerald-600 dark:text-emerald-400 font-medium">
                  Verified account
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3 pt-5 border-t border-slate-100 dark:border-night-600">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-night-700/60">
              <User size={15} className="text-violet-400 shrink-0" />
              <div>
                <p className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wide">Full Name</p>
                <p className="text-sm font-body text-slate-700 dark:text-slate-200 mt-0.5">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-night-700/60">
              <Mail size={15} className="text-violet-400 shrink-0" />
              <div>
                <p className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-sm font-body text-slate-700 dark:text-slate-200 mt-0.5">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <Lock size={14} className="text-violet-500" />
            </div>
            <h3 className="text-base font-display font-bold text-slate-800 dark:text-white">
              Change Password
            </h3>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4" noValidate>
            <FormField label="Current Password" error={errors.currentPassword}>
              <PasswordInput value={form.currentPassword} onChange={set("currentPassword")}
                placeholder="Enter current password" autoComplete="current-password"
                hasError={!!errors.currentPassword} />
            </FormField>

            <FormField label="New Password" error={errors.newPassword}>
              <PasswordInput value={form.newPassword} onChange={set("newPassword")}
                placeholder="Min. 6 characters" autoComplete="new-password"
                hasError={!!errors.newPassword} />
            </FormField>

            <FormField label="Confirm New Password" error={errors.confirmPassword}>
              <PasswordInput value={form.confirmPassword} onChange={set("confirmPassword")}
                placeholder="Re-enter new password" autoComplete="new-password"
                hasError={!!errors.confirmPassword} />
            </FormField>

            <button type="submit" disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 w-full py-3 mt-2">
              {loading
                ? <><div className="spinner" /> Saving…</>
                : <><Save size={15} /> Update Password</>}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/"
            className="text-sm font-body text-violet-500 hover:text-violet-600 hover:underline transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Profile;