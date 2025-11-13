
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PortalLayout = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* === Navbar === */}
      <header
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "15px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", fontSize: "20px" }}>🎓 Student Portal</h2>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/studentsignin");
          }}
          style={{
            background: "#fff",
            color: "#007bff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </header>

      {/* === Page Content === */}
      <main
        style={{
          flex: 1,
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* 👇 This is CRITICAL — renders child pages like Dashboard/Courses */}
        <Outlet />
      </main>

      {/* === Footer === */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#f1f1f1",
          color: "#666",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} AEIS Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default PortalLayout;
