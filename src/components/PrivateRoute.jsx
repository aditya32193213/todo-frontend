import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isTokenExpired } from "../utils/token";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!user || !token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;