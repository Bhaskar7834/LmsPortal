import Program from "../models/Program.js";
import Testimonial from "../models/Testimonial.js";

// Serve navbar/ticker/footer - fallback to static content if DB empty
export const getNavbar = async (req, res) => {
  // You could store navbar data in DB; for now return static object (or read from DB if desired)
  res.json({
    tagline: "LEARN, PRACTICE, AND ACHIEVE.",
    subTagline: "Learn with ease.",
    links: [
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
      { name: "Add School", path: "/add-school" },
      { name: "Gallery", path: "/gallery" }
    ],
    buttons: [
      { text: "Student Login", path: "/studentsignin" }
    ],
    logos: {
      mainLogo: "/assets/aeis-logo.png",
      sideLogo: "/assets/parent-student-icon.png"
    }
  });
};

export const getTicker = async (req, res) => {
  // If you'd rather store this list in DB, you can. For now static:
  res.json({
    locations: [
      "Andhra Pradesh",
      "Telangana",
      "Karnataka",
      "And many more cities..."
    ]
  });
};

export const getFooter = async (req, res) => {
  res.json({
    about: "Discover our commitment to excellence. We provide schools with the best syllabus books, teacher training, and materials at affordable prices.",
    mission: "To cultivate intellectual curiosity, critical thinking, and a lifelong love of learning in our students.",
    vision: "To be a leading educational institution that empowers students.",
    coreValues: ["Integrity", "Collaboration", "Equality of Students", "Continuous Improvement", "Student-Centric Approach"],
    quickLinks: [
      { name: "Programs", path: "/programs" },
      { name: "About Us", path: "/about-us" },
      { name: "Contact", path: "/contact" }
    ],
    payments: [
      { name: "Visa", icon: "https://placehold.co/50x32/white/black?text=VISA" },
      { name: "Mastercard", icon: "https://placehold.co/50x32/white/black?text=MC" }
    ],
    contact: {
      address: "Hyderabad, Telangana, India",
      email: "contact@aeis.com",
      phone: "+91 12345 67890"
    },
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com"
    },
    copyright: `© ${new Date().getFullYear()} AEIS. All rights reserved.`
  });
};
