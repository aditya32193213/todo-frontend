import API from "./api";

export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const logout = async (token) => {
  await API.post("/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePassword = async (data) => {
  const res = await API.patch("/auth/password", data);
  return res.data;
};