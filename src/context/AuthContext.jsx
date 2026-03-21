import { createContext, useContext, useState, useCallback } from "react";
import {
  login    as loginService,
  register as registerService,
  logout   as logoutService,
  updatePassword as updatePasswordService,
} from "../services/authService";
import { setLoggingOut } from "../services/api";

const AuthContext = createContext(null);

const parseError = (err) =>
  err?.response?.data?.message || err?.message || "Something went wrong";

// On JSON.parse failure, remove the corrupt entry so the next page load
// doesn't fail again silently.
const readUser = () => {
  try {
    const s = localStorage.getItem("tf-user");
    return s ? JSON.parse(s) : null;
  } catch (_e) {
    localStorage.removeItem("tf-user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  // Two separate loading flags so login/register and password update
  // don't share state — hitting Save on Profile while loading from a
  // separate auth call won't incorrectly show a spinner on the wrong button.
  const [authLoading,    setAuthLoading]    = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [user,           setUser]           = useState(readUser);

  const handleLogin = useCallback(async (credentials) => {
    setAuthLoading(true);
    try {
      const data = await loginService(credentials);
      // Backend: { success, message, data: { id, name, email, token } }
      // authService returns res.data, so payload is at data.data.
      const userData = {
        id:    data.data.id,
        name:  data.data.name,
        email: data.data.email,
      };
      localStorage.setItem("token",   data.data.token);
      localStorage.setItem("tf-user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (err) {
      return { success: false, error: parseError(err) };
    } finally { setAuthLoading(false); }
  }, []);

  const handleRegister = useCallback(async (credentials) => {
    setAuthLoading(true);
    try {
      await registerService(credentials);
      return { success: true };
    } catch (err) {
      return { success: false, error: parseError(err) };
    } finally { setAuthLoading(false); }
  }, []);

  // setLoggingOut(true) tells the 401 interceptor to stand down so it
  // doesn't queue its own redirect while handleLogout is already navigating.
  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem("token"); // read before clearing

    localStorage.removeItem("token");
    localStorage.removeItem("tf-user");
    setUser(null);

    setLoggingOut(true);
    try { await logoutService(token); } catch (_e) { /* already expired */ }
    finally { setLoggingOut(false); }

    window.location.href = "/login";
  }, []);

  const handleUpdatePassword = useCallback(async (data) => {
    setProfileLoading(true);
    try {
      await updatePasswordService(data);
      return { success: true };
    } catch (err) {
      return { success: false, error: parseError(err) };
    } finally { setProfileLoading(false); }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading:        authLoading,    // login / register spinner
      profileLoading,                 // password update spinner
      handleLogin, handleRegister, handleLogout, handleUpdatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};