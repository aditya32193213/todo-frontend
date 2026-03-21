import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Decodes the JWT payload (no signature verification — that is the server's job)
// to read the exp claim and detect expiry on the client before any API call fires.
//
// Without this check a user who closed the tab while logged in, then reopened it
// after the token expired, would see the dashboard for a moment before the first
// API request returned 401 and the interceptor redirected them.
//
// Failure modes — all treated as expired and redirected:
//   · Token missing from storage
//   · Non-base64 string (atob throws)
//   · JSON.parse fails on the decoded payload
//   · exp claim absent
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true; // treat any decode failure as expired
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