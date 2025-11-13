// frontend/src/pages/Student/CoursePlayer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

const CoursePlayer = () => {
  const { enrollmentId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  useEffect(() => {
  console.log("🎬 Active video URL:", activeLesson?.videoUrl);
}, [activeLesson]);

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  /* ============================================================
     📡 Fetch Course by Enrollment ID
  ============================================================ */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/enrollments/details/${enrollmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.course;
        setCourse(data);

        // ✅ Default to first lesson OR fallback to main course video
        if (data.lessons?.length > 0) {
          setActiveLesson(data.lessons[0]);
        } else {
          setActiveLesson({
            title: data.title,
            videoUrl: data.videoUrl,
            duration: "Main Video",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [enrollmentId, token]);

  /* ============================================================
     ⏳ Loading / Error States
  ============================================================ */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-600">
        Loading course player...
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-600">
        Course not found.
      </div>
    );

  /* ============================================================
     🎥 Course Player UI
  ============================================================ */
  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 sm:p-8 font-poppins">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        🎓 {course.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= Video Player ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
          {activeLesson?.videoUrl ? (
            <video
              key={activeLesson.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-lg"
            >
              <source src={activeLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No video available.
            </div>
          )}

          <h2 className="text-lg font-semibold mt-4">
            {activeLesson?.title || "Untitled"}
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {activeLesson?.content ||
              "Start learning your first lesson and enjoy the video!"}
          </p>
        </div>

        {/* ================= Lesson List ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Lessons ({course.lessons?.length || 1})
          </h3>
          <ul className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
            {/* ✅ If lessons exist, show them */}
            {course.lessons?.length > 0 ? (
              course.lessons.map((lesson, idx) => (
                <li
                  key={lesson._id || idx}
                  onClick={() => setActiveLesson(lesson)}
                  className={`cursor-pointer p-3 rounded-lg border ${
                    activeLesson?.videoUrl === lesson.videoUrl
                      ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                      : "bg-gray-50 border-transparent hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}. {lesson.title}
                </li>
              ))
            ) : (
              // ✅ Fallback to main course video if no lessons exist
              <li
                onClick={() =>
                  setActiveLesson({
                    title: course.title,
                    videoUrl: course.videoUrl,
                    duration: "Main Video",
                  })
                }
                className="cursor-pointer p-3 rounded-lg border bg-indigo-50 border-indigo-400 text-indigo-700"
              >
                🎬 Main Course Video
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
