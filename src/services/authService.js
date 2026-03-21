import API from "./api";

export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// Accepts the raw token as a parameter so the caller can read it from
// localStorage BEFORE clearing it, then pass it here explicitly.
// This bypasses the Axios request interceptor which reads from localStorage
// (already cleared by the time this fires in the fixed logout flow).
export const logout = async (token) => {
  await API.post("/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePassword = async (data) => {
  const res = await API.patch("/auth/password", data);
  return res.data;
};