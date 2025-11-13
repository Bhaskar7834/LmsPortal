import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import API from "../api/axios";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Demo fallback data
  const demoCourses = {
    abacus: {
      title: "Abacus Level 1",
      description:
        "Learn Abacus fundamentals and improve mental math skills with structured lessons and exercises.",
      instructor: "AEIS Faculty",
      duration: "3 Months",
      category: "Mathematics",
      level: "Beginner",
      videoUrl:
        "https://res.cloudinary.com/dyydz363x/video/upload/v1762944164/videoplayback_1_n8qlem.mp4",
    },
    vedic: {
      title: "Vedic Maths Basics",
      description:
        "Master ancient Vedic techniques to perform quick and accurate arithmetic calculations.",
      instructor: "AEIS Faculty",
      duration: "2.5 Months",
      category: "Mathematics",
      level: "Intermediate",
      videoUrl:
        "https://res.cloudinary.com/dyydz363x/video/upload/v1762944596/videoplayback_2_t5ms35.mp4",
    },
    handwriting: {
      title: "Handwriting Improvement",
      description:
        "Transform your handwriting with proven methods for speed, legibility, and confidence.",
      instructor: "AEIS Faculty",
      duration: "1.5 Months",
      category: "Skill Development",
      level: "Beginner",
      videoUrl:
        "https://res.cloudinary.com/dyydz363x/video/upload/v1762944785/videoplayback_3_v6e83e.mp4",
    },
    olympiad: {
      title: "Olympiad Preparation",
      description:
        "Boost your reasoning, logic, and math problem-solving skills for Olympiad excellence.",
      instructor: "AEIS Faculty",
      duration: "4 Months",
      category: "Competitive Exams",
      level: "Advanced",
      videoUrl:
        "https://res.cloudinary.com/dyydz363x/video/upload/v1762944951/videoplayback_4_jvvkkb.mp4",
    },
  };

  // ✅ Fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data.data || demoCourses[id]);
      } catch {
        toast("Loaded demo course");
        setCourse(demoCourses[id]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // ✅ Enrollment
  const handleEnroll = async () => {
    if (!user || !token) {
      toast.error("Please sign in to enroll");
      navigate("/studentsignin");
      return;
    }

    try {
      await API.post(
        "/enrollments",
        { userId: user._id || user.id, courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Enrolled in ${course.title} 🎉`);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 400)
        toast("You are already enrolled in this course");
      else toast.error("Enrollment failed");
    }
  };

  // ✅ Progress
  const handleProgress = async (state) => {
    const percent = Math.floor(state.played * 100);
    setProgress(percent);

    if (!token || !user || !course) return;
    if (percent % 10 === 0 || percent >= 90) {
      try {
        await API.patch(
          "/progress/update",
          {
            courseId: course._id || id,
            videoId: course.videoUrl,
            progressPercent: percent,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (percent >= 90 && !completed) {
          setCompleted(true);
          toast.success("🎉 Course marked as completed!");
        }
      } catch (error) {
        console.error("❌ Progress update failed:", error);
      }
    }
  };

  // ✅ UI States
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh] font-poppins">
        <h3>Loading course details...</h3>
      </div>
    );

  if (!course)
    return (
      <div className="text-center py-20 font-poppins text-gray-600">
        Course not found.
      </div>
    );

  // ✅ Clean Modern UI
  return (
    <div className="bg-[#f8f9fa] py-16 px-6 font-poppins min-h-screen flex justify-center">
      <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full p-8 md:p-12">
        {/* === Header === */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0b2545] mb-3 text-center">
            {course.title}
          </h1>
          <p className="text-gray-600 text-center leading-relaxed max-w-2xl mx-auto">
            {course.description}
          </p>
        </div>

        {/* === Video Player === */}
        {course.videoUrl && (
          <div className="mb-8">
            <ReactPlayer
              ref={playerRef}
              url={course.videoUrl}
              controls
              width="100%"
              height="400px"
              onProgress={handleProgress}
              className="rounded-xl overflow-hidden shadow-md"
            />
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#e63946] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2 text-[#1D3557] font-semibold text-center">
                Progress: {progress}%
              </p>
            </div>
          </div>
        )}

        {/* === Course Details === */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8 text-gray-700 text-sm">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <strong>📚 Category:</strong> {course.category}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <strong>🕒 Duration:</strong> {course.duration}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <strong>👨‍🏫 Instructor:</strong> {course.instructor}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <strong>⭐ Level:</strong> {course.level}
          </div>
        </div>

        {/* === Actions === */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleEnroll}
            className="bg-[#e63946] hover:bg-[#c5303e] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Enroll Now
          </button>
          <button
            onClick={() => navigate("/courses")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
