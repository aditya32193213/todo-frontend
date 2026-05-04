// src/App.jsx
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import GuestRoute from "./components/GuestRoute";
import { setNavigate } from "./utils/navigation";          // ← new

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center page-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center animate-glow-pulse">
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
          <path
            d="M12 20l5.5 5.5L28 14"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="spinner" />
    </div>
  </div>
);

// Component that passes the navigate function to the global reference
const NavigateInjector = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return null;
};

const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

function App() {
  return (
    <BrowserRouter>
      <NavigateInjector />                  {/* ← must be inside Router */}
      <AppProviders>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary onReset={() => window.location.reload()}>
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="/profile"
              element={
                <ErrorBoundary onReset={() => window.location.reload()}>
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="/login"
              element={
                <ErrorBoundary onReset={() => window.location.reload()}>
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="/register"
              element={
                <ErrorBoundary onReset={() => window.location.reload()}>
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="*"
              element={
                <ErrorBoundary onReset={() => window.location.reload()}>
                  <NotFound />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: "500",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: {
              style: {
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
              },
              iconTheme: {
                primary: "#16a34a",
                secondary: "#f0fdf4",
              },
            },
            error: {
              style: {
                background: "#fff1f2",
                border: "1px solid #fecdd3",
                color: "#9f1239",
              },
              iconTheme: {
                primary: "#e11d48",
                secondary: "#fff1f2",
              },
            },
          }}
        />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;