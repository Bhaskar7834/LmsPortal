import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedCourses = async () => {
  await connectDB();

  const sampleCourses = [
    {
      title: "Vedic Maths for Beginners",
      description: "Learn ancient Indian math tricks to calculate faster and smarter.",
      instructor: "Suresh Kumar",
      videoUrl: "https://www.youtube.com/watch?v=1xVw6PsSinI",
    },
    {
      title: "Science Made Simple",
      description: "Interactive experiments and fun learning for young minds.",
      instructor: "Dr. Anita Sharma",
      videoUrl: "https://www.youtube.com/watch?v=CBjXkBzQ7EE",
    },
    {
      title: "Spoken English Basics",
      description: "Boost your English fluency and confidence in real-life conversations.",
      instructor: "Ravi Teja",
      videoUrl: "https://www.youtube.com/watch?v=9mZ2LcdK9aY",
    },
    {
      title: "Maths Olympiad Prep",
      description: "Get ready for competitive exams with logical reasoning and problem-solving tricks.",
      instructor: "Meera Chand",
      videoUrl: "https://www.youtube.com/watch?v=FKgBCGUpbP4",
    },
  ];

  try {
    await Course.deleteMany(); // clear old data
    const created = await Course.insertMany(sampleCourses);
    console.log(`✅ Inserted ${created.length} demo courses!`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding courses:", err.message);
    process.exit(1);
  }
};

seedCourses();
