import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Reuse styled components (consistent design)
import {
  Section,
  Container,
  Title,
  CardGrid,
  ProgramCard,
  CardImage,
  CardTitle,
  CardDescription,
  CardLink,
} from "../../styles/SpecialProgramsStyle";

// ✅ Import images from assets
import abacusImage from "../../assets/abacus-program.png";
import vedicMathsImage from "../../assets/vedic-maths.png";
import handwritingImage from "../../assets/handwriting-program.png";
import olympiadImage from "../../assets/olympiad-program.png";

// ✅ Static program data (acts as a frontend showcase for your backend LMS)
const programsData = [
  {
    _id: "abacus",
    image: abacusImage,
    title: "Abacus Program",
    description:
      "Unlock mathematical potential with engaging abacus training designed for young learners.",
  },
  {
    _id: "vedic",
    image: vedicMathsImage,
    title: "Vedic Maths Mastery",
    description:
      "Discover the world's fastest mental math system through Vedic methods for accuracy and speed.",
  },
  {
    _id: "handwriting",
    image: handwritingImage,
    title: "Handwriting Improvement",
    description:
      "Transform messy handwriting into neat and confident writing with proven techniques.",
  },
  {
    _id: "olympiad",
    image: olympiadImage,
    title: "Olympiad Preparation",
    description:
      "Prepare for excellence in national and international Olympiads with expert-led sessions.",
  },
];

const SpecialPrograms = () => {
  const navigate = useNavigate();

  // ✅ Navigate to LMS Course Details page
  const handleCardClick = (programId) => {
    navigate(`/courses/${programId}`);
  };

  return (
    // ✅ Add ID for smooth scroll from Explore AEIS
    <Section id="special-programs">
      <Container>
        <Title>Our Special Programs</Title>

        <CardGrid>
          {programsData.map((program) => (
            <ProgramCard
              key={program._id}
              onClick={() => handleCardClick(program._id)}
              $clickable
            >
              <CardImage src={program.image} alt={program.title} />
              <CardTitle>{program.title}</CardTitle>
              <CardDescription>{program.description}</CardDescription>

              <CardLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCardClick(program._id);
                }}
              >
                Know more &gt;
              </CardLink>
            </ProgramCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default SpecialPrograms;
