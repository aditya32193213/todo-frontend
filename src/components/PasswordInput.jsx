import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Encapsulates the show/hide password toggle that was copy-pasted across
// Login.jsx, Register.jsx, and Profile.jsx (three separate implementations).
//
// Usage:
//   <PasswordInput
//     value={form.password}
//     onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
//     placeholder="Min. 6 characters"
//     autoComplete="new-password"
//     hasError={!!errors.password}
//   />

const PasswordInput = ({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  hasError = false,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input pr-11 ${hasError ? "input-error" : ""}`}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400
                   hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
};

export default PasswordInput;