import React from 'react';
import {
  SectionContainer,
  Title,
  Subtitle,
  ContentBox,
  ClassSelector,
  CardsWrapper,
  InfoCard,
  VerticalSeparator,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardLink,
  NewTag,
  CtaWrapper,
  CtaButton
} from '../../styles/ComprehensiveSectionStyle';

import learningAppImage from '../../assets/learning-app.png';
import classesAdvantageImage from '../../assets/classes-advantage.png';

const ComprehensiveSection = () => {
  // ✅ Smooth scroll to SpecialPrograms section
  const handleScrollToPrograms = () => {
    const target = document.getElementById("special-programs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionContainer>
      <Title>Comprehensive learning programs & classes for all students</Title>
      <Subtitle>
        Become lifelong learners with India's best teachers, engaging video lessons
        and personalised learning journeys
      </Subtitle>

      <ContentBox>
        <ClassSelector>Classes 1 - 8</ClassSelector>

        <CardsWrapper>
          <InfoCard>
            <CardImage src={learningAppImage} alt="AEIS Education" />
            <CardContent>
              <CardTitle>AEIS Education Begins Here</CardTitle>
              <CardDescription>
                Personalised learning program to learn anytime, anywhere
              </CardDescription>
              <CardLink href="#special-programs">Know more &gt;</CardLink>
            </CardContent>
          </InfoCard>

          <VerticalSeparator />

          <InfoCard>
            <NewTag>NEW</NewTag>
            <CardImage src={classesAdvantageImage} alt="AEIS Training" />
            <CardContent>
              <CardTitle>AEIS Training</CardTitle>
              <CardDescription>
                Best training program by expert faculties
              </CardDescription>
              <CardLink href="#special-programs">Know more &gt;</CardLink>
            </CardContent>
          </InfoCard>
        </CardsWrapper>

        {/* ✅ CTA scrolls smoothly to SpecialPrograms */}
        <CtaWrapper>
          <CtaButton onClick={handleScrollToPrograms}>Explore AEIS</CtaButton>
        </CtaWrapper>
      </ContentBox>
    </SectionContainer>
  );
};

export default ComprehensiveSection;
