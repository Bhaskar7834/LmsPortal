import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

// Assets
import abacusImage from "../assets/abacus-program.png";
import vedicMathsImage from "../assets/vedic-maths.png";
import handwritingImage from "../assets/handwriting-program.png";
import olympiadImage from "../assets/olympiad-program.png";
import defaultCourseImg from "../assets/parent-student-icon.png";

// Styles
import {
  Section,
  Container,
  Title,
  CardGrid,
  ProgramCard,
  CardImage,
  CardTitle,
  CardDescription,
  CardLink,
} from "../styles/SpecialProgramsStyle";

const getCourseImage = (course) => {
  const title = course.title?.toLowerCase() || "";
  if (title.includes("abacus")) return abacusImage;
  if (title.includes("vedic")) return vedicMathsImage;
  if (title.includes("handwriting")) return handwritingImage;
  if (title.includes("olympiad")) return olympiadImage;
  return defaultCourseImg;
};

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ✅ Fallback demo data
  const demoCourses = [
    {
      _id: "abacus",
      title: "Abacus Program",
      description:
        "Unlock mathematical potential with engaging abacus training designed for young learners.",
      duration: "3 Months",
      instructor: "Admin",
      category: "Mathematics",
      level: "Beginner",
    },
    {
      _id: "vedic",
      title: "Vedic Maths Mastery",
      description:
        "Discover the world's fastest mental math system through ancient Vedic methods.",
      duration: "2.5 Months",
      instructor: "Admin",
      category: "Mathematics",
      level: "Intermediate",
    },
    {
      _id: "handwriting",
      title: "Handwriting Improvement",
      description:
        "Transform messy handwriting into neat, confident penmanship with guided practice.",
      duration: "1.5 Months",
      instructor: "Admin",
      category: "Skill Development",
      level: "Beginner",
    },
    {
      _id: "olympiad",
      title: "Maths Olympiad Prep",
      description:
        "Prepare to excel in national and international Olympiads with structured coaching.",
      duration: "4 Months",
      instructor: "Admin",
      category: "Competitive Exams",
      level: "Advanced",
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        const data = res.data?.data || res.data || [];
        setCourses(data.length > 0 ? data : demoCourses);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        toast.error("Failed to load courses — using demo data");
        setCourses(demoCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // 🧠 Enroll
  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;

    if (!token || !userId) {
      toast.error("Please log in to enroll");
      navigate("/studentsignin");
      return;
    }

    try {
      await API.post(
        "/enrollments",
        { userId, courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Enrolled successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Enrollment Error:", error);
      if (error.response?.status === 400) {
        toast.error("You are already enrolled in this course");
      } else {
        toast.error("Enrollment failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-600 font-poppins">
        <h2>Loading courses...</h2>
      </div>
    );
  }

  // 🎨 MAIN UI
  return (
    <Section>
      <Container>
        <Title>Explore Our Courses</Title>

        <CardGrid>
          {courses.map((course) => (
            <ProgramCard key={course._id}>
              <CardImage
                src={getCourseImage(course)}
                alt={course.title}
                onError={(e) => (e.target.src = defaultCourseImg)}
              />
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>
                {course.description?.length > 120
                  ? course.description.slice(0, 120) + "..."
                  : course.description}
              </CardDescription>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="bg-[#e63946] hover:bg-[#c5303e] text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300"
                >
                  Enroll Now
                </button>
                <CardLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCourse(course);
                  }}
                >
                  Preview
                </CardLink>
              </div>
            </ProgramCard>
          ))}
        </CardGrid>

        {/* ⚡ MODERN GLASS POPUP */}
        {selectedCourse && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-3xl p-6 text-white animate-slideUp"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-4 text-gray-200 hover:text-red-400 text-2xl font-bold transition-all"
              >
                ×
              </button>

              {/* Title */}
              <h2 className="text-2xl font-semibold mb-3 text-center text-white drop-shadow-sm">
                {selectedCourse.title}
              </h2>

              {/* Description */}
              <p className="text-gray-200 mb-5 leading-relaxed text-center text-sm">
                {selectedCourse.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-5 text-sm text-gray-100">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
                  <span className="block font-semibold text-white">
                    🕒 Duration
                  </span>
                  <span>{selectedCourse.duration || "N/A"}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
                  <span className="block font-semibold text-white">
                    📚 Category
                  </span>
                  <span>{selectedCourse.category || "General"}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
                  <span className="block font-semibold text-white">
                    👨‍🏫 Instructor
                  </span>
                  <span>{selectedCourse.instructor || "Admin"}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
                  <span className="block font-semibold text-white">⭐ Level</span>
                  <span>{selectedCourse.level || "Beginner"}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-2">
                <button
                  onClick={() => handleEnroll(selectedCourse._id)}
                  className="bg-[#00B4D8] hover:bg-[#0096c7] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default Courses;
