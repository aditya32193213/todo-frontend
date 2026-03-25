import API from "./api";

const handle = async (promise) => {
  try {
    const res = await promise;
    return res?.data ?? null;
  } catch (error) {
    console.error("API Error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    throw message;
  }
};

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
  } catch (error) {
    console.error("Logout failed:", error);
  }
};