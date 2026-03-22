import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  const token    = localStorage.getItem("token");

  // User has a valid, non-expired token → already logged in, send to dashboard
  if (user && token && !isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  // No valid session → render the guest page (Login / Register) normally
  return children;
};

export default GuestRoute;