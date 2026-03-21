import axios from "axios";
import toast from "react-hot-toast";

if (!process.env.REACT_APP_API_URL && process.env.NODE_ENV === "development") {
  console.warn(
    "[api] REACT_APP_API_URL is not set.\n" +
    "Falls back to the deployed API — set REACT_APP_API_URL locally to target a different server."
  );
}

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://todo-backend-t5gm.onrender.com/api",
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

// ── Logout flag ────────────────────────────────────────────────────────────
// When handleLogout runs deliberately it sets this flag before calling the
// backend. The 401 interceptor checks it and skips its own redirect so we
// never queue two simultaneous navigations to /login.
let isLoggingOut = false;
export const setLoggingOut = (v) => { isLoggingOut = v; };

// ── Request: attach JWT automatically ─────────────────────────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response: handle 401 globally ─────────────────────────────────────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      // FIX 4: only redirect from here when it's a real session expiry,
      // not a deliberate logout (which handles its own redirect).
      localStorage.removeItem("token");
      localStorage.removeItem("tf-user");

      if (window.location.pathname !== "/login") {
        toast.error("Your session has expired. Please sign in again.");
        setTimeout(() => { window.location.href = "/login"; }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default API;