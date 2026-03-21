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

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token    = localStorage.getItem("token");

  if (!user || !token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;