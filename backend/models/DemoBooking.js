import mongoose from "mongoose";

const demoBookingSchema = new mongoose.Schema(
  {
    childName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true },
    schoolName: { type: String, trim: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    course: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DemoBooking", demoBookingSchema);
