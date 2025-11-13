import express from "express";
import DemoBooking from "../models/DemoBooking.js";

const router = express.Router();

/* ==========================================================
   🎯 PUBLIC ROUTE — BOOK A DEMO SESSION
   URL: /api/public/book-demo
   Access: Public (No Auth Required)
========================================================== */
router.post("/book-demo", async (req, res) => {
  try {
    const { childName, mobileNumber, schoolName, email, state, course } = req.body;

    if (!childName || !mobileNumber || !email || !state || !course) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    const booking = await DemoBooking.create({
      childName,
      mobileNumber,
      schoolName,
      email,
      state,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Your free demo session is booked successfully! 🎉",
      data: booking,
    });
  } catch (error) {
    console.error("❌ Demo Booking Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to book demo session. Please try again.",
    });
  }
});

export default router;
