import React from "react";
import {
  Section,
  Container,
  Title,
  TestimonialGrid,
  TestimonialCard,
  QuoteIcon,
  TestimonialText,
  AuthorInfo,
  Avatar,
  AuthorDetails,
  AuthorName,
  AuthorRelation,
} from "../../styles/TestimonialsStyle";

// ✅ Modern styled testimonials (no external animation library)
const testimonialsData = [
  {
    quote:
      "AEIS transformed my daughter's learning experience. The interactive lessons and visual content helped her grasp Science faster than ever!",
    avatar: "https://placehold.co/100x100/E9E6F4/5A3F9E?text=AS",
    name: "Anjali Sharma",
    relation: "Mother of Priya, Class 6",
  },
  {
    quote:
      "Thanks to AEIS, my son now loves Math! The fun explanations and examples make learning engaging and practical.",
    avatar: "https://placehold.co/100x100/FFC0CB/8B0000?text=RK",
    name: "Rajesh Kumar",
    relation: "Father of Souradip, Class 8",
  },
  {
    quote:
      "The personalized support at AEIS is incredible. My child’s confidence and scores have improved drastically in just 3 months!",
    avatar: "https://placehold.co/100x100/D3D3D3/000000?text=SV",
    name: "Sunita Verma",
    relation: "Mother of Rohan, Class 7",
  },
];

const Testimonials = () => {
  return (
    <Section
      style={{
        background: "linear-gradient(135deg, #f9f9ff, #f1f4ff)",
        padding: "80px 20px",
      }}
    >
      <Container>
        <Title
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#1a237e",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        >
          ❤️ What Our Parents Say
        </Title>

        <TestimonialGrid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,255,0.8))",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                borderRadius: "20px",
                padding: "30px",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.4)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.08)";
              }}
            >
              <QuoteIcon
                style={{
                  fontSize: "2.8rem",
                  color: "#e63946",
                  lineHeight: "0.5",
                  marginBottom: "12px",
                }}
              >
                “
              </QuoteIcon>

              <TestimonialText
                style={{
                  fontSize: "1rem",
                  color: "#333",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                {testimonial.quote}
              </TestimonialText>

              <AuthorInfo style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "3px solid #e63946",
                    marginRight: "15px",
                  }}
                />
                <AuthorDetails>
                  <AuthorName
                    style={{
                      fontSize: "1rem",
                      color: "#1a237e",
                      fontWeight: "600",
                    }}
                  >
                    {testimonial.name}
                  </AuthorName>
                  <AuthorRelation
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    {testimonial.relation}
                  </AuthorRelation>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </Container>
    </Section>
  );
};

export default Testimonials;
