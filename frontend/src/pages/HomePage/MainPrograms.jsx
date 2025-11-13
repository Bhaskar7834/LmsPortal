import React from 'react';
import {
  ProgramsSection,
  SectionTitle,
  ProgramsWrapper,
  ProgramCard,
  ProgramImage,
  ProgramInfo,
  ProgramTitle,
  ProgramDescription,
  ProgramLink
} from '../styles/MainProgramsStyle';

// Make sure you have these images in your src/assets/ folder
import classesImage from '../assets/classes-1-7.png';
import aeisImage from '../assets/advantage-program.png';

const MainPrograms = () => {
  return (
    <ProgramsSection>
      <SectionTitle>Comprehensive learning programs & classes for all students</SectionTitle>
      <ProgramsWrapper>
        {/* Card 1: Classes 1-8 */}
        <ProgramCard>
          <ProgramImage src={classesImage} alt="Classes 1 to 8" />
          <ProgramInfo>
            <ProgramTitle>Classes 1 - 8</ProgramTitle>
            <ProgramDescription>
              Personalized learning program to learn anytime, anywhere.
            </ProgramDescription>
            <ProgramLink href="#">Know more &rarr;</ProgramLink>
          </ProgramInfo>
        </ProgramCard>

        {/* Card 2: AEIS */}
        <ProgramCard>
          <ProgramImage src={aeisImage} alt="AEIS Advantage" />
          <ProgramInfo>
            <ProgramTitle>AEIS Advantage</ProgramTitle>
            <ProgramDescription>
              AEIS Institute's flagship program for excellence and a strong foundation.
            </ProgramDescription>
            <ProgramLink href="#">Explore AEIS &rarr;</ProgramLink>
          </ProgramInfo>
        </ProgramCard>
      </ProgramsWrapper>
    </ProgramsSection>
  );
};

export default MainPrograms;