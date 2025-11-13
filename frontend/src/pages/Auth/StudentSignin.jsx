import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const StudentSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Disable global layout padding on auth pages
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/signin", {
        email,
        password,
      });

      console.log("✅ Signin success:", res.data);

      // ✅ Save user data & token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      alert("🎓 Student signin successful!");

      // 🕒 Small delay so navigation happens smoothly after alert
      setTimeout(() => {
        const role = res.data.user.role?.toLowerCase();
        if (role === "admin") {
          console.log("Navigating to admin dashboard...");
          navigate("/admin/dashboard");
        } else {
          console.log("Navigating to student dashboard...");
          navigate("/dashboard");
        }
      }, 300);
    } catch (err) {
      console.error("❌ Signin error:", err);
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
        background: "linear-gradient(135deg, #007bff, #6c63ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            color: "#007bff",
            fontWeight: "700",
            marginBottom: "25px",
            fontSize: "24px",
          }}
        >
          🎓 Student Signin
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
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
              placeholder="Enter your student email"
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
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,123,255,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
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
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,123,255,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              transition: "background 0.3s, transform 0.2s",
              boxShadow: "0 4px 15px rgba(0,123,255,0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#0056b3";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#007bff";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Signin
          </button>

          {/* Error Message */}
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

        {/* Footer */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/studentsignup"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignin;
