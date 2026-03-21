import { useId, cloneElement, Children } from "react";

const FormField = ({ label, error, children, required = false }) => {
  const autoId = useId();
  const child = Children.only(children);
  const childWithId = cloneElement(child, { id: autoId });

  return (
    <div>
      <label
        htmlFor={autoId}
        className="block text-xs font-display font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {childWithId}
      {error && (
        <p className="text-xs text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;