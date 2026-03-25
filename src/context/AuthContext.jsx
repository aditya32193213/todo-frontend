import { createContext, useContext, useState, useCallback } from "react";
import {
  login    as loginService,
  register as registerService,
  logout   as logoutService,
  updatePassword as updatePasswordService,
} from "../services/authService";
import { setLoggingOut } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const parseError = (err) =>
   typeof err === "string"
    ? err
    : err?.message || "Something went wrong";

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
  const navigate = useNavigate();


  const [authLoading,    setAuthLoading]    = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [user,           setUser]           = useState(readUser);

  const handleLogin = useCallback(async (credentials) => {
    setAuthLoading(true);
    try {
      const data = await loginService(credentials);
      const userData = {
        id:    data?.data?.id,
        name:  data?.data?.name,
        email: data?.data?.email,
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

  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem("token"); 

    localStorage.removeItem("token");
    localStorage.removeItem("tf-user");
    setUser(null);

    setLoggingOut(true);
    try { await logoutService(token); } catch (_e) { /* already expired */ }
    finally { setLoggingOut(false); }

    navigate("/login");
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
      loading:        authLoading,   
      profileLoading,                 
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