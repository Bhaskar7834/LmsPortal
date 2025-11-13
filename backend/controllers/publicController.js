import DemoBooking from "../models/DemoBooking.js";
import Program from "../models/Program.js";
import Testimonial from "../models/Testimonial.js";

export const bookDemo = async (req, res) => {
  try {
    const { childName, mobileNumber, email, state, course } = req.body;
    if (!childName || !mobileNumber || !email) {
      return res.status(400).json({ success: false, message: "Please fill required fields" });
    }
    const booking = await DemoBooking.create({ childName, mobileNumber, email, state, course });
    return res.status(201).json({ success: true, message: "Booking received! We will contact you shortly.", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: 1 });
    res.json({ success: true, programs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
