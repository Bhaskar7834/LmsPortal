import axios from "axios";

/**
 * ===============================================
 * 🌐 API Configuration for AEIS LMS Portal
 * ===============================================
 * Handles all HTTP requests to the backend.
 * Automatically attaches JWT tokens (if available)
 * for protected routes.
 */

// Dynamic Base URL (adjusts for localhost or production)
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"; 
  // 👈 use port 4000 (your backend)

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// === Attach JWT Token Automatically ===
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// === Handle Global Errors (optional but useful) ===
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: auto-logout on 401
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/studentsignin";
    }
    return Promise.reject(error);
  }
);

export default API;
