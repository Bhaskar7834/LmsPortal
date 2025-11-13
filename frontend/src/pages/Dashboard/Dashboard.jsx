// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Reuse the same styled-components used by Program.jsx
import {
  Section,
  Container,
  Title,
  CardGrid,
  ProgramCard,
  ImgWrapper,
  CardBody,
  CardImage,
  CardTitle,
  CardDescription,
  CardFooter,
  CardLink,
  Small,
  ProgressWrap,
  ProgressBar,
} from "../../styles/SpecialProgramsStyle";

// Assets
import defaultCourseImg from "../../assets/parent-student-icon.png";
import abacusImage from "../../assets/abacus-program.png";
import vedicMathsImage from "../../assets/vedic-maths.png";
import handwritingImage from "../../assets/handwriting-program.png";
import olympiadImage from "../../assets/olympiad-program.png";

/* Helper to match course titles to local images (fallback to default) */
const getCourseImage = (title = "") => {
  const lower = (title || "").toLowerCase();
  if (lower.includes("abacus")) return abacusImage;
  if (lower.includes("vedic")) return vedicMathsImage;
  if (lower.includes("handwriting")) return handwritingImage;
  if (lower.includes("olympiad")) return olympiadImage;
  return defaultCourseImg;
};

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const userId = user?._id || user?.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/studentsignin");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await API.get(`/enrollments/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Expecting array of enrollments with courseId and progress
        setCourses(res.data?.data || []);
      } catch (err) {
        console.error("Error loading enrollments:", err);
        toast.error("Could not load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  if (loading)
    return (
      <Section style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <Container>
          <Title>My Enrolled Courses</Title>
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading your courses...
          </p>
        </Container>
      </Section>
    );

  if (!courses || courses.length === 0)
    return (
      <Section>
        <Container>
          <Title>My Enrolled Courses</Title>
          <div style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem 0" }}>
            <h3 style={{ marginBottom: 12, color: "#0b2545" }}>
              You haven’t enrolled in any courses yet.
            </h3>
            <p style={{ marginBottom: 20 }}>
              Explore our programs and start learning today.
            </p>
            <button
              onClick={() => navigate("/courses")}
              style={{
                background: "linear-gradient(90deg,#2563eb,#4f46e5)",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Explore Courses
            </button>
          </div>
        </Container>
      </Section>
    );

  return (
    <Section>
      <Container>
        <Title>My Enrolled Courses</Title>

        <CardGrid>
          {courses.map((enroll) => {
            const course = enroll.courseId || enroll.course || {};
            const progress = enroll.progress ?? enroll.progressPercent ?? 0;
            const status = enroll.status || "active";

            return (
              <ProgramCard key={enroll._id || course._id} $clickable>
                <ImgWrapper>
                  <img
                    src={getCourseImage(course.title)}
                    alt={course.title || "course"}
                    onError={(e) => {
                      e.currentTarget.src = defaultCourseImg;
                    }}
                  />
                </ImgWrapper>

                <CardBody>
                  <CardTitle title={course.title}>
                    {course.title || "Untitled Course"}
                  </CardTitle>

                  <CardDescription>
                    {course.description
                      ? course.description.slice(0, 140)
                      : "No description available."}
                  </CardDescription>

                  <div style={{ marginTop: 8 }}>
                    <ProgressWrap aria-hidden>
                      <ProgressBar
                        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                      />
                    </ProgressWrap>
                    <Small style={{ display: "block", marginTop: 8 }}>
                      Progress: {Math.round(progress)}% · {status === "completed" ? "✅ Completed" : "📘 Active"}
                    </Small>
                  </div>

                  <CardFooter>
                    {/* Left side could have small metadata — duration / lessons */}
                    <Small>{course?.lessons?.length ? `${course.lessons.length} lessons` : "—"}</Small>

                    <CardLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // Navigate to course player (use enrollment or course id)
                        const id = enroll._id || course._id || course.slug || course.title;
                        navigate(`/student/courses/${id}/player`);
                      }}
                    >
                      Resume ▶
                    </CardLink>
                  </CardFooter>
                </CardBody>
              </ProgramCard>
            );
          })}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Dashboard;
