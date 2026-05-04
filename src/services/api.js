// src/services/api.js
import axios from "axios";
import toast from "react-hot-toast";
import { navigate } from "../utils/navigation";   // ← new import

if (!process.env.REACT_APP_API_URL && process.env.NODE_ENV === "development") {
  console.warn(
    "[api] REACT_APP_API_URL is not set.\n" +
    "Falls back to the deployed API — set REACT_APP_API_URL locally to target a different server."
  );
}

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://todo-backend-t5gm.onrender.com/api",
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

// ───── Guards ──────────────────────────────────────────────
let isLoggingOut = false;          // set by AuthContext during explicit logout
let handled401 = false;            // set by interceptor after handling a 401

export const setLoggingOut = (val) => {
  isLoggingOut = val;
};

// ───── Request interceptor ─────────────────────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      handled401 = false;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ───── Response interceptor ────────────────────────────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut && !handled401) {
      handled401 = true;

      localStorage.removeItem("token");
      localStorage.removeItem("tf-user");

      if (window.location.pathname !== "/login") {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          navigate("/login");               // ← soft SPA navigation
        }, 1500);
      }
    }

    if (!error.response) {
      return Promise.reject("Network error. Please check your connection.");
    }

    if (error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(message);
  }
);

export default API;