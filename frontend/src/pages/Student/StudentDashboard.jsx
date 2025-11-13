import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Assets
import abacusImage from "../assets/abacus-program.png";
import vedicMathsImage from "../assets/vedic-maths.png";
import handwritingImage from "../assets/handwriting-program.png";
import olympiadImage from "../assets/olympiad-program.png";
import defaultCourseImg from "../assets/parent-student-icon.png";

// Helper: Match course title to image
const getProgramImage = (title = "") => {
  const lower = title.toLowerCase();
  if (lower.includes("abacus")) return abacusImage;
  if (lower.includes("vedic")) return vedicMathsImage;
  if (lower.includes("handwriting")) return handwritingImage;
  if (lower.includes("olympiad")) return olympiadImage;
  return defaultCourseImg;
};

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?._id || user?.id;
  const userName = user?.name || "Student";

  useEffect(() => {
    if (!userId || !token) {
      toast.error("Please sign in to access your dashboard.");
      navigate("/studentsignin");
      return;
    }

    const fetchEnrollments = async () => {
      try {
        const res = await API.get(`/enrollments/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrollments(res.data?.data || []);
      } catch (error) {
        console.error("❌ Error fetching enrollments:", error);
        toast.error("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId, token, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-600 font-poppins">
        <h3>Loading your dashboard...</h3>
      </div>
    );

  if (enrollments.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center font-poppins px-5">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Hey {userName}, you haven’t enrolled in any courses yet.
        </h2>
        <p className="text-gray-500 mb-6">
          Start your learning journey today with AEIS Academy!
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-[#e63946] hover:bg-[#c5303e] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
        >
          🚀 Explore Courses
        </button>
      </div>
    );

  const completed = enrollments.filter((e) => e.status === "completed").length;

  return (
    <section className="bg-[#f9fafb] py-16 px-6 font-poppins min-h-screen">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-[#e63946] mb-2">
          Welcome back, {userName}! 👋
        </h2>
        <p className="text-gray-600">Track your enrolled courses below.</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6 mb-14">
        <div className="bg-white rounded-2xl shadow-md px-8 py-6 text-center w-60">
          <h3 className="text-3xl font-bold text-[#e63946]">
            {enrollments.length}
          </h3>
          <p className="text-gray-500 text-sm mt-2">Courses Enrolled</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md px-8 py-6 text-center w-60">
          <h3 className="text-3xl font-bold text-[#28a745]">{completed}</h3>
          <p className="text-gray-500 text-sm mt-2">Courses Completed</p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-[#1d3557] mb-8 text-center">
          My Enrolled Courses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {enrollments.map((item) => {
            const course = item.courseId || {};
            const imgSrc = getProgramImage(course.title || "");

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-5 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() =>
                  navigate(`/courses/${course._id || course.title?.toLowerCase()}`)
                }
              >
                {/* Image */}
                <img
                  src={imgSrc}
                  alt={course.title}
                  className="w-full h-[150px] object-contain mb-4"
                  onError={(e) => (e.target.src = defaultCourseImg)}
                />

                {/* Title & Desc */}
                <h4 className="text-lg font-semibold text-[#1d3557] mb-2">
                  {course.title || "Untitled Course"}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {course.description
                    ? course.description.slice(0, 80) + "..."
                    : "No description available."}
                </p>

                {/* Progress */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-[#e63946] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Progress: {item.progress || 0}% |{" "}
                  {item.status === "completed"
                    ? "✅ Completed"
                    : "📘 In Progress"}
                </p>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/courses/${course._id || course.title?.toLowerCase()}`
                    );
                  }}
                  className="mt-auto bg-[#e63946] hover:bg-[#c5303e] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                >
                  ▶ Continue Learning
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
