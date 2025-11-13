import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios"; // ✅ Use API instance (no localhost)

const StudentSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Disable global padding for auth pages
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  // Handle Signin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/signin", {
        email,
        password,
      });

      console.log("✅ Signin Success:", res.data);

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      alert("🎓 Student signin successful!");

      // Redirect based on role
      const role = res.data.user.role?.toLowerCase();

      role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/dashboard");

    } catch (err) {
      console.error("❌ Signin Error:", err);
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
            <label style={{ marginBottom: "8px", display: "block" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ marginBottom: "8px", display: "block" }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          {/* Signin Button */}
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
            }}
          >
            Signin
          </button>
        </form>

        {/* Footer */}
        <p style={{ marginTop: "20px", color: "#555" }}>
          Don’t have an account?{" "}
          <Link
            to="/studentsignup"
            style={{ color: "#007bff", fontWeight: "600" }}
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignin;
