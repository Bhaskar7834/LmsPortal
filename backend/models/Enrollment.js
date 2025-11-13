import mongoose from "mongoose";

/**
 * ============================================================
 * 🧾 ENROLLMENT MODEL
 * Tracks student-course relationships and progress
 * ============================================================
 */
const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    lastAccessed: {
      type: Date,
      default: Date.now, // Used for "Continue Learning"
    },
    completionDate: {
      type: Date,
    },
    lastWatchedVideo: {
      type: String, // stores the Cloudinary video URL or lesson ID
      default: null,
    },
    progressHistory: [
      {
        percent: Number,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

/* ============================================================
   🧠 PRE-SAVE HOOK
   Automatically mark as completed when progress >= 100
   ============================================================ */
enrollmentSchema.pre("save", function (next) {
  if (this.progress >= 100 && this.status !== "completed") {
    this.status = "completed";
    this.completionDate = Date.now();
  }
  next();
});

/* ============================================================
   🧹 CLEAN API OUTPUT
   ============================================================ */
enrollmentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

/* ============================================================
   ✅ Prevent duplicate enrollments
   ============================================================ */
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

/* ============================================================
   🚀 EXPORT MODEL
   ============================================================ */
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
