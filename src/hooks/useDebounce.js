import { useState, useEffect } from "react";

/**
 * Delays updating the returned value until after `delay` ms
 * have passed since the last change. Used for search inputs
 * to avoid firing API calls on every keystroke.
 */
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;