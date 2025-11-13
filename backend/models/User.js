import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * ============================================================
 * 🧠 USER MODEL
 * Supports Students and Admins
 * ============================================================
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // 🔐 Never return password by default
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

/* ============================================================
   🔒 PASSWORD HASHING (Pre-save Hook)
   ============================================================ */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("❌ Password hashing error:", err.message);
    next(err);
  }
});

/* ============================================================
   🔑 PASSWORD VALIDATION
   ============================================================ */
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (err) {
    console.error("❌ Password comparison error:", err.message);
    return false;
  }
};

/* ============================================================
   🧼 HIDE SENSITIVE FIELDS WHEN RETURNING JSON
   ============================================================ */
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

/* ============================================================
   🚀 EXPORT MODEL
   ============================================================ */
const User = mongoose.model("User", userSchema);
export default User;
