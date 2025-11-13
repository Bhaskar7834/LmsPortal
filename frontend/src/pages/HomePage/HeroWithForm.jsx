import React, { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast"; // ✅ Toast for professional feedback

import {
  HeroSection,
  HeroWrapper,
  ImageContainer,
  Image,
  FormColumn,
  FormContainer,
  FormTitle,
  FormRow,
  FormGroup,
  InputIcon,
  FormInput,
  SelectWrapper,
  FormSelect,
  FormButton,
} from "../../styles/HeroWithFormStyle";

import {
  FaUser,
  FaPhoneAlt,
  FaSchool,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook,
} from "react-icons/fa";
import mainStudentImage from "../../assets/main-student-hero.png";

const HeroWithForm = () => {
  const [childName, setChildName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!childName || !mobileNumber || !email || !state || !course) {
      toast.error("⚠️ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/public/book-demo", {
        childName,
        mobileNumber,
        schoolName,
        email,
        state,
        course,
      });

      toast.success(res.data.message || "✅ Your free demo session is booked!");
      // Reset form fields
      setChildName("");
      setMobileNumber("");
      setSchoolName("");
      setEmail("");
      setState("");
      setCourse("");
    } catch (error) {
      console.error("❌ Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to book session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroSection>
      <HeroWrapper>
        {/* Left Side Image */}
        <ImageContainer>
          <Image src={mainStudentImage} alt="Student ready to learn" />
        </ImageContainer>

        {/* Right Side Form */}
        <FormColumn>
          <FormContainer onSubmit={handleSubmit}>
            <FormTitle>Book a Free Demo Session</FormTitle>

            <FormGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <FormInput
                type="text"
                placeholder="Child Name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputIcon>
                <FaPhoneAlt />
              </InputIcon>
              <FormInput
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputIcon>
                <FaSchool />
              </InputIcon>
              <FormInput
                type="text"
                placeholder="School Name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <FormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            {/* Select Options */}
            <FormRow>
              <SelectWrapper>
                <InputIcon>
                  <FaMapMarkerAlt />
                </InputIcon>
                <FormSelect
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                </FormSelect>
              </SelectWrapper>

              <SelectWrapper>
                <InputIcon>
                  <FaBook />
                </InputIcon>
                <FormSelect
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">Course</option>
                  <option value="Abacus">Abacus</option>
                  <option value="Vedic Maths">Vedic Maths</option>
                  <option value="Handwriting">Handwriting</option>
                  <option value="Olympiad">Olympiad</option>
                </FormSelect>
              </SelectWrapper>
            </FormRow>

            <FormButton type="submit" disabled={loading}>
              {loading ? "Booking..." : "Continue to Book"}
            </FormButton>
          </FormContainer>
        </FormColumn>
      </HeroWrapper>
    </HeroSection>
  );
};

export default HeroWithForm;
