import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import Logo           from "../components/Logo";
import FormField      from "../components/FormField";
import PasswordInput  from "../components/PasswordInput";
import PageBackground from "../components/PageBackground"; 
import useAuth        from "../hooks/useAuth";

const REGISTER_ORBS = [
  "w-80 h-80 bg-violet-500/25 top-[-90px] right-[-70px]",
  "w-64 h-64 bg-violet-700/20 bottom-[-60px] left-[-50px]",
];

const Register = () => {
  const { handleRegister, loading } = useAuth();
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
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await handleRegister({
      name:     form.name.trim(),
      email:    form.email.trim(),
      password: form.password,
    });

    if (result.success) {
      toast.success("Account created! Please sign in 🎉");
      navigate("/login");
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <PageBackground orbs={REGISTER_ORBS} />

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center mb-8 gap-3">
          <Logo size="lg" />
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
              Create account
            </h1>
            <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1">
              Start managing tasks like a pro
            </p>
          </div>
        </div>

        <div className="form-scene">
          <div className="form-3d glass rounded-2xl p-7">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <FormField label="Full Name" error={errors.name}>
                <input type="text" autoComplete="name" value={form.name}
                  onChange={set("name")} placeholder="John Doe"
                  className={`input ${errors.name ? "input-error" : ""}`} />
              </FormField>

              <FormField label="Email Address" error={errors.email}>
                <input type="email" autoComplete="email" value={form.email}
                  onChange={set("email")} placeholder="you@example.com"
                  className={`input ${errors.email ? "input-error" : ""}`} />
              </FormField>

              <FormField label="Password" error={errors.password}>
                <PasswordInput value={form.password} onChange={set("password")}
                  placeholder="Min. 6 characters" autoComplete="new-password"
                  hasError={!!errors.password} />
              </FormField>

              <FormField label="Confirm Password" error={errors.confirm}>
                <PasswordInput value={form.confirm} onChange={set("confirm")}
                  placeholder="Re-enter password" autoComplete="new-password"
                  hasError={!!errors.confirm} />
              </FormField>

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2">
                {loading
                  ? <><div className="spinner" /> Creating…</>
                  : <><UserPlus size={16} /> Create Account</>}
              </button>
            </form>

            <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{" "}
              <Link to="/login"
                className="text-violet-500 hover:text-violet-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;