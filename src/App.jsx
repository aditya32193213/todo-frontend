import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider }  from "./context/AuthContext";
import PrivateRoute      from "./components/PrivateRoute";
import ErrorBoundary     from "./components/ErrorBoundary";

const Home     = lazy(() => import("./pages/Home"));
const Login    = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile  = lazy(() => import("./pages/Profile"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center page-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400
                      flex items-center justify-center animate-glow-pulse">
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
          <path d="M12 20l5.5 5.5L28 14" stroke="white" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="spinner" />
    </div>
  </div>
);

// FIX: ErrorBoundary is a class component and cannot call useNavigate() directly.
// RouteErrorBoundary is a thin function wrapper that lives INSIDE BrowserRouter
// (so useNavigate is available) and passes navigate as the onReset prop.
// This enables soft React Router navigation on "Go to home" instead of a hard
// window.location.href = "/" reload that re-downloads all JS chunks.
const RouteErrorBoundary = ({ children }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary onReset={() => navigate("/", { replace: true })}>
      {children}
    </ErrorBoundary>
  );
};

const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
);

function App() {
  return (
    <AppProviders>
      {/* BrowserRouter is now the OUTER wrapper so RouteErrorBoundary can
          call useNavigate() for soft navigation on error recovery. */}
      <BrowserRouter>
        <RouteErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Protected */}
              <Route path="/"        element={<PrivateRoute><Home    /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

              {/* Public */}
              <Route path="/login"    element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Catch-all */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center gap-4 page-bg">
                  <p className="text-6xl font-display font-extrabold text-violet-400">404</p>
                  <p className="text-slate-500 dark:text-slate-400 font-body">Page not found</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </BrowserRouter>

      {/* Global toast — outside BrowserRouter intentionally so it renders
          above all route transitions without being unmounted on navigation */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize:   "13px",
            fontWeight: "500",
            borderRadius: "12px",
            padding:    "12px 16px",
          },
          success: {
            style: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" },
            iconTheme: { primary: "#16a34a", secondary: "#f0fdf4" },
          },
          error: {
            style: { background: "#fff1f2", border: "1px solid #fecdd3", color: "#9f1239" },
            iconTheme: { primary: "#e11d48", secondary: "#fff1f2" },
          },
        }}
      />
    </AppProviders>
  );
}

export default App;