// cleanup.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // path to your user model

dotenv.config();

const cleanUsers = async () => {
  try {
    // 1️⃣ Connect to MongoDB using your existing MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Delete ALL users (old accounts with plain-text passwords)
    await User.deleteMany({});
    console.log("🧹 All users deleted successfully!");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔒 Connection closed");
  }
};

cleanUsers();
