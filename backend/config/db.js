import mongoose from "mongoose";

let isConnected = false; // prevent multiple connections in dev

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ MongoDB already connected (cached)");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events for better stability
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying...");
      isConnected = false;
      setTimeout(connectDB, 5000);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err.message);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    // Retry after 5 seconds if initial connection fails
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
