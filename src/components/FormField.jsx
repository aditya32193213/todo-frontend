import { useId, cloneElement, Children } from "react";

// FIX: The label previously had no htmlFor attribute, so:
//   1. Screen readers couldn't associate the label with its input.
//   2. Clicking the label text didn't focus the field.
//
// Fix uses useId() to generate a stable unique ID per FormField instance,
// sets htmlFor on the label to that ID, and uses cloneElement to inject
// the same ID onto the single child element (input or PasswordInput).
//
// PasswordInput already spreads {...rest} onto its inner <input>, so passing
// id through cloneElement correctly lands on the actual input element.
//
// Usage — no changes needed at call sites:
//   <FormField label="Email" error={errors.email}>
//     <input type="email" ... />
//   </FormField>

const FormField = ({ label, error, children, required = false }) => {
  const autoId = useId();

  // Inject the id into the single child so the label's htmlFor has a target
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