// src/utils/navigation.js
let navigateFunc = null;

export const setNavigate = (fn) => {
  navigateFunc = fn;
};

export const navigate = (to) => {
  if (navigateFunc) {
    navigateFunc(to);
  } else {
    // Fallback for calls before the router is ready (should never happen)
    window.location.href = to;
  }
};