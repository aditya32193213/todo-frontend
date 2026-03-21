import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";

import Logo            from "../components/Logo";
import FormField       from "../components/FormField";
import PasswordInput   from "../components/PasswordInput";
import PageBackground  from "../components/PageBackground";
import useAuth         from "../hooks/useAuth";

const LOGIN_ORBS = [
  "w-96 h-96 bg-violet-400/30 top-[-120px] left-[-80px]",
  "w-72 h-72 bg-violet-600/20 bottom-[-80px] right-[-60px]",
];

const Login = () => {
  const { handleLogin, loading } = useAuth();
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
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await handleLogin(form);
    if (result.success) {
      toast.success("Welcome back! 👋");
      navigate("/");
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <PageBackground orbs={LOGIN_ORBS} />

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center mb-8 gap-3">
          <Logo size="lg" />
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1">
              Sign in to your TaskFlow account
            </p>
          </div>
        </div>

        <div className="form-scene">
          <div className="form-3d glass rounded-2xl p-7">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <FormField label="Email Address" error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
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

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                {loading
                  ? <><div className="spinner" /> Signing in…</>
                  : <><LogIn size={16} /> Sign In</>}
              </button>
            </form>

            <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link to="/register"
                className="text-violet-500 hover:text-violet-600 font-semibold hover:underline transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;