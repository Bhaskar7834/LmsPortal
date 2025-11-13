import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Remove padding for full-screen view
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/admin-login", {
        email,
        password,
      });

      console.log("Admin login success:", res.data);
      alert("Admin login successful!");
      localStorage.setItem("admin", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #e63946, #ff5f6d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          textAlign: "center",
          animation: "fadeIn 0.6s ease",
        }}
      >
        <h2
          style={{
            color: "#e63946",
            fontWeight: "700",
            marginBottom: "25px",
            fontSize: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🛡️ Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your admin email"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#e63946";
                e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#e63946";
                e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#e63946",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              transition: "background 0.3s, transform 0.2s",
              boxShadow: "0 4px 15px rgba(230,57,70,0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#c5303e";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#e63946";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Login
          </button>

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "15px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}
        </form>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Not an admin?{" "}
          <Link
            to="/studentsignin"
            style={{
              color: "#e63946",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Student Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignin;
