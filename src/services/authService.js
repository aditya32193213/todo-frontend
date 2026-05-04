import API from "./api";

// No try-catch — interceptor already formats errors
const handle = (promise) => promise.then((res) => res?.data ?? null);

export const register = (data = {}) =>
  handle(API.post("/auth/register", data));

export const login = (data = {}) =>
  handle(API.post("/auth/login", data));

export const updatePassword = (data = {}) =>
  handle(API.patch("/auth/password", data));

export const logout = async (token) => {
  try {
    await API.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (_e) {
    // Logout failures are intentionally silent — the user has already been logged out locally.
    console.error("Logout API call failed:", _e);
  }
};