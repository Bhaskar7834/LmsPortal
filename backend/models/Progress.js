import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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
    videoId: {
      type: String,
      required: true, // can be Cloudinary video URL or lesson ID
    },
    progressPercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate entries for the same user-course-video combo
progressSchema.index({ userId: 1, courseId: 1, videoId: 1 }, { unique: true });

// 🧠 Auto-update "completed" when progress >= 90
progressSchema.pre("save", function (next) {
  if (this.progressPercent >= 90) {
    this.completed = true;
  }
  this.lastUpdated = new Date();
  next();
});

// 🧹 Clean JSON output
progressSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
