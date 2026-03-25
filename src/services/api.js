import axios from "axios";
import toast from "react-hot-toast";

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

let isLoggingOut = false;

export const setLoggingOut = (val) => {
  isLoggingOut = val;
};

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Prevent multiple logout triggers
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      localStorage.removeItem("token");
      localStorage.removeItem("tf-user");

      if (window.location.pathname !== "/login") {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }

    // ✅ Network error
    if (!error.response) {
      return Promise.reject("Network error. Please check your connection.");
    }

    // ✅ Server error (optional)
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