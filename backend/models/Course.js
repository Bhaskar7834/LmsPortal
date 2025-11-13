import mongoose from "mongoose";

// Prevent model re-declaration if hot-reloading or multiple imports
const existingCourseModel = mongoose.models.Course;

// ============================================================
// 🎓 COURSE MODEL (Error-free & Production Ready)
// Supports single or multiple video lessons
// ============================================================

// ✅ Default Cloudinary Thumbnails
const DEFAULT_THUMBNAILS = {
  abacus: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953562/abacus-program.png_eacngy.jpg",
  vedic: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953578/vedic-maths_-_Copy_-_Copy_6_mdnq7x.avif",
  handwriting: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953601/handwriting-program_gfq7es.png",
  olympiad: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953613/olympiad-program_-_Copy_3_uq5sh3.webp",
  default: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953639/parent-student-icon_-_Copy_sih5fi.jpg",
};

// ============================================================
// 🧩 LESSON SCHEMA
// ============================================================
const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    duration: { type: String, default: "N/A" },
  },
  { _id: false }
);

// ============================================================
// 📘 COURSE SCHEMA
// ============================================================
const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Course title is required"], trim: true },
    description: { type: String, required: [true, "Course description is required"], trim: true },
    thumbnail: { type: String, trim: true, default: DEFAULT_THUMBNAILS.default },
    videoUrl: { type: String, required: [true, "Video URL is required"], trim: true },
    lessons: [LessonSchema],
    instructor: { type: String, default: "AEIS Faculty", trim: true },
    category: { type: String, default: "General", trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ============================================================
// 🧠 PRE-SAVE HOOK — Auto thumbnail selection
// ============================================================
CourseSchema.pre("save", function (next) {
  const title = this.title?.toLowerCase() || "";
  if (!this.thumbnail || this.thumbnail.includes("default-course")) {
    if (title.includes("abacus")) this.thumbnail = DEFAULT_THUMBNAILS.abacus;
    else if (title.includes("vedic")) this.thumbnail = DEFAULT_THUMBNAILS.vedic;
    else if (title.includes("handwriting")) this.thumbnail = DEFAULT_THUMBNAILS.handwriting;
    else if (title.includes("olympiad")) this.thumbnail = DEFAULT_THUMBNAILS.olympiad;
    else this.thumbnail = DEFAULT_THUMBNAILS.default;
  }
  next();
});

// ============================================================
// 🧹 CLEAN JSON OUTPUT
// ============================================================
CourseSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

// ============================================================
// 🚀 EXPORT MODEL
// ============================================================
const Course = existingCourseModel || mongoose.model("Course", CourseSchema);
export default Course;
