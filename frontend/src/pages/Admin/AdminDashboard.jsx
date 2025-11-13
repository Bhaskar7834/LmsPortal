import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
  });
  const [popularCourses, setPopularCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===============================
     📊 FETCH DASHBOARD DATA
  =============================== */
  const fetchDashboardData = async () => {
    try {
      const [statsRes, coursesRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/courses"),
      ]);

      const data = statsRes.data?.data || {};
      setStats({
        totalStudents: data.totals?.totalStudents || 0,
        totalCourses: data.totals?.totalCourses || 0,
        totalEnrollments: data.totals?.totalEnrollments || 0,
      });

      setCourses(coursesRes.data?.data || []);
    } catch (error) {
      console.error("❌ Dashboard load failed:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ===============================
     🗑️ DELETE COURSE
  =============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/admin/courses/${id}`);
      toast.success("Course deleted successfully");
      fetchDashboardData();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  const handleEdit = (id) => navigate(`/admin/edit-course/${id}`);
  const handleAddCourse = () => navigate("/admin/add-course");
  const handleAddAdmin = () => navigate("/admin/add-admin");

  /* ===============================
     📈 CHART DATA
  =============================== */
  const chartData = {
    labels: courses.map((c) => c.title),
    datasets: [
      {
        label: "Enrollments",
        data: courses.map(() => Math.floor(Math.random() * 50)), // demo numbers
        backgroundColor: "rgba(29,53,87,0.8)",
        borderRadius: 8,
      },
    ],
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h3>Loading dashboard...</h3>
      </div>
    );

  /* ===============================
     🎨 MAIN UI
  =============================== */
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🛡️ Admin Dashboard</h2>
        <div style={styles.headerButtons}>
          <button onClick={handleAddCourse} style={styles.primaryBtn}>
            ➕ Add New Course
          </button>
          <button onClick={handleAddAdmin} style={styles.secondaryBtn}>
            👤 Add Admin
          </button>
        </div>
      </div>

      {/* ANALYTICS CARDS */}
      <div style={styles.analytics}>
        {[
          { label: "Total Students", value: stats.totalStudents },
          { label: "Total Courses", value: stats.totalCourses },
          { label: "Total Enrollments", value: stats.totalEnrollments },
        ].map((item, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.cardValue}>{item.value}</h3>
            <p style={styles.cardLabel}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* CHART */}
      {courses.length > 0 && (
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>📊 Course Engagement Overview</h3>
          <Bar data={chartData} />
        </div>
      )}

      {/* COURSE LIST */}
      <h3 style={styles.sectionTitle}>📚 All Courses</h3>
      {courses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No courses found. Please add a new one.
        </p>
      ) : (
        <div style={styles.grid}>
          {courses.map((course) => (
            <div key={course._id} style={styles.courseCard}>
              {/* Thumbnail */}
              <div style={styles.imageContainer}>
                <img
                  src={
                    course.thumbnail ||
                    "https://res.cloudinary.com/dyydz363x/image/upload/v1762953639/parent-student-icon_-_Copy_sih5fi.jpg"
                  }
                  alt={course.title}
                  style={styles.cardImage}
                  onError={(e) =>
                    (e.target.src =
                      "https://res.cloudinary.com/dyydz363x/image/upload/v1762953639/parent-student-icon_-_Copy_sih5fi.jpg")
                  }
                />
              </div>

              {/* Course Info */}
              <h4 style={styles.courseTitle}>{course.title}</h4>
              <p style={styles.courseDesc}>
                {course.description?.slice(0, 80)}...
              </p>
              <p style={styles.videoCount}>
                🎥 {course.lessons?.length || 0} Video
                {(course.lessons?.length || 0) !== 1 ? "s" : ""}
              </p>

              {/* Actions */}
              <div style={styles.cardActions}>
                <button
                  onClick={() => handleEdit(course._id)}
                  style={styles.editBtn}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  style={styles.deleteBtn}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ===============================
   🎨 MODERN STYLES
=============================== */
const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  headerButtons: { display: "flex", gap: 12 },
  title: { color: "#1D3557", fontSize: 26, fontWeight: 700 },
  primaryBtn: {
    background: "#1D3557",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.3s",
  },
  secondaryBtn: {
    background: "#e63946",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.3s",
  },
  analytics: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
    marginBottom: 40,
  },
  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    width: 220,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  cardValue: { fontSize: 28, fontWeight: 700, color: "#1D3557", marginBottom: 8 },
  cardLabel: { color: "#555", fontWeight: 500 },
  chartBox: {
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: 40,
  },
  chartTitle: { marginBottom: 15, color: "#1D3557" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#1D3557",
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 25,
  },
  courseCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    background: "#f8f9fa",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1D3557",
    margin: "5px 0",
  },
  courseDesc: { fontSize: 14, color: "#555" },
  videoCount: { fontSize: 13, color: "#888", marginTop: 8 },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  editBtn: {
    background: "#457b9d",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default AdminDashboard;
