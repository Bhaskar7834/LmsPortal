import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js"; // ✅ uses your main DB connection
import Course from "../models/Course.js";

// Load environment variables
dotenv.config();

/* ============================================================
 * 🖼️ Cloudinary Thumbnail Mapping
 * ============================================================
 */
const THUMBNAILS = {
  abacus: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953562/abacus-program.png_eacngy.jpg",
  vedic: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953578/vedic-maths_-_Copy_-_Copy_6_mdnq7x.avif",
  handwriting: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953601/handwriting-program_gfq7es.png",
  olympiad: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953613/olympiad-program_-_Copy_3_uq5sh3.webp",
  default: "https://res.cloudinary.com/dyydz363x/image/upload/v1762953639/parent-student-icon_-_Copy_sih5fi.jpg",
};

/* ============================================================
 * 🔄 Assign correct thumbnail
 * ============================================================
 */
const assignThumbnail = (title = "") => {
  const lower = title.toLowerCase();
  if (lower.includes("abacus")) return THUMBNAILS.abacus;
  if (lower.includes("vedic")) return THUMBNAILS.vedic;
  if (lower.includes("handwriting")) return THUMBNAILS.handwriting;
  if (lower.includes("olympiad")) return THUMBNAILS.olympiad;
  return THUMBNAILS.default;
};

/* ============================================================
 * 🚀 Main Execution
 * ============================================================
 */
(async () => {
  try {
    // ✅ Connect using existing logic & .env
    await connectDB();

    const courses = await Course.find();
    console.log(`🔍 Found ${courses.length} total courses`);

    let updated = 0;
    let skipped = 0;

    for (const course of courses) {
      const newThumb = assignThumbnail(course.title);

      if (course.thumbnail === newThumb) {
        skipped++;
        continue;
      }

      course.thumbnail = newThumb;
      await course.save();
      updated++;
      console.log(`✅ Updated: ${course.title}`);
    }

    console.log("===========================================");
    console.log("🎉 Thumbnails updated successfully!");
    console.log(`✅ Updated Courses: ${updated}`);
    console.log(`⏩ Skipped (Already OK): ${skipped}`);
    console.log("===========================================");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error while updating thumbnails:", err);
    process.exit(1);
  }
})();
