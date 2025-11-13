import axios from "axios";

// Dynamic Base URL for production
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://lmsportal-gfe7.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/studentsignin";
    }
    return Promise.reject(error);
  }
);

export default API;
