import School from "../models/School.js";

// ✅ Add School Controller
export const addSchool = async (req, res) => {
  try {
    const { schoolName, address, city, state } = req.body;

    if (!schoolName || !address || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create new school entry
    const newSchool = await School.create({
      schoolName,
      address,
      city,
      state,
      addedBy: req.user ? req.user._id : null, // optional admin tracking
    });

    res.status(201).json({
      success: true,
      message: "School added successfully",
      school: newSchool,
    });
  } catch (error) {
    console.error("❌ Error adding school:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding school",
      error: error.message,
    });
  }
};
