// Re-export from AuthContext so existing imports in Login.jsx and Register.jsx
// continue to work without any changes to those files.
import { useAuth } from "../context/AuthContext";
export default useAuth;