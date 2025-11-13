import React from 'react';

// --- Final, Corrected Homepage Sections ---
import HeroWithForm from './HeroWithForm';
import ComprehensiveSection from './ComprehensiveSection';
import SpecialPrograms from './SpecialPrograms';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <>
      {/* 1. The clean, professional hero section */}
      <HeroWithForm />

      {/* 2. The compact, two-part program showcase */}
      <ComprehensiveSection />

      {/* 3. The four-card grid of special programs */}
      <SpecialPrograms /> 

      {/* 4. The professional testimonials section */}
      <Testimonials />
    </>
  );
};

export default Home;