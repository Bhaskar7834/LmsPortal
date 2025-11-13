import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const email = "admin@example.com";
    const password = "admin123";

    // Remove any existing admin
    await User.deleteOne({ email });

    // ✅ Create admin through Mongoose model (auto-hashes password)
    const admin = new User({
      name: "Admin User",
      email,
      password, // will be hashed automatically by pre('save') hook
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully:");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
