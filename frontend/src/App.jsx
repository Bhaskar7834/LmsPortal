import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/GlobalStyle";
import { Toaster } from "react-hot-toast";

/* ===============================
   🌐 Lazy-Loaded Layouts
================================== */
const MainLayout = lazy(() => import("./components/common/Layout.jsx"));
const PortalLayout = lazy(() => import("./components/layout/PortalLayout.jsx"));

/* ===============================
   📄 Lazy-Loaded Pages
================================== */
const Home = lazy(() => import("./pages/HomePage/Home"));

const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const CoursePlayer = lazy(() => import("./pages/Student/CoursePlayer.jsx"));

/* 🎓 Admin Pages */
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
const AddCourse = lazy(() => import("./pages/Admin/AddCourse.jsx"));
const AddAdmin = lazy(() => import("./pages/Admin/AddAdmin.jsx"));
const AdminSignin = lazy(() => import("./pages/Admin/AdminSignin.jsx"));

/* 👩‍🎓 Student Auth Pages */
const StudentSignin = lazy(() => import("./pages/Auth/StudentSignin.jsx"));
const StudentSignup = lazy(() => import("./pages/Auth/StudentSignup.jsx"));

/* ===============================
   ⏳ Loading Fallback
================================== */
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Poppins, sans-serif",
      color: "#1D3557",
    }}
  >
    <h2>Loading...</h2>
  </div>
);

/* ===============================
   🚧 Placeholder Page
================================== */
const PlaceholderPage = ({ title }) => (
  <div
    style={{
      textAlign: "center",
      padding: "60px",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    <h1>{title}</h1>
    <p>This page is under construction.</p>
    <a href="/" style={{ color: "#457B9D", textDecoration: "underline" }}>
      ← Go Home
    </a>
  </div>
);

/* ===============================
   🔒 Route Guards
================================== */
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase()?.trim();
  return token && role === "admin" ? children : <Navigate to="/admin-login" replace />;
};

const StudentRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase()?.trim();
  return token && role === "student" ? children : <Navigate to="/studentsignin" replace />;
};

/* ===============================
   🧠 Main AppContent (Routes + Layouts)
================================== */
const AppContent = () => {
  const location = useLocation();

  const noPaddingPages = [
    "/studentsignin",
    "/studentsignup",
    "/admin-login",
    "/dashboard",
    "/courses",
    "/admin/dashboard",
    "/admin/add-admin",
    "/admin/add-course",
  ];

  const isNoPadding = noPaddingPages.some((path) =>
    location.pathname.startsWith(path)
  );

  const isAuthPage = ["/studentsignin", "/studentsignup", "/admin-login"].includes(
    location.pathname
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      style={{
        background: isAuthPage ? "transparent" : theme.colors.bgLight,
        paddingTop: isNoPadding ? 0 : 118,
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#4BB543", color: "#fff" } },
          error: { style: { background: "#E63946", color: "#fff" } },
        }}
      />

      {/* Suspense Fallback for Lazy Loading */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ========== 🌍 PUBLIC ROUTES (Main Layout) ========== */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
            <Route path="/know-more" element={<PlaceholderPage title="Know More" />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
          </Route>

          {/* ========== 🎓 STUDENT PORTAL (Protected) ========== */}
          <Route
            element={
              <StudentRoute>
                <PortalLayout />
              </StudentRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/student/courses/:enrollmentId/player"
              element={<CoursePlayer />}
            />
          </Route>

          {/* ========== 🔑 AUTHENTICATION ROUTES ========== */}
          <Route path="/studentsignin" element={<StudentSignin />} />
          <Route path="/studentsignup" element={<StudentSignup />} />
          <Route path="/admin-login" element={<AdminSignin />} />

          {/* ========== 🧭 ADMIN ROUTES (Protected) ========== */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-course"
            element={
              <AdminRoute>
                <AddCourse />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-admin"
            element={
              <AdminRoute>
                <AddAdmin />
              </AdminRoute>
            }
          />

          {/* ========== 🚫 404 FALLBACK ========== */}
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

/* ===============================
   💠 Main App Wrapper
================================== */
const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
