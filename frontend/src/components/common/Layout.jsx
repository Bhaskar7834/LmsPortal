import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Import the unified Header component
import Footer from './Footer'; // Assuming Footer exists in the same folder

// This component ONLY defines the main structure
const MainLayout = () => {
  return (
    <>
      <Header /> {/* Render the Header component */}
      
      {/* The main content area where routed pages will appear */}
      <main> 
        <Outlet /> 
      </main>
      
      <Footer />
    </>
  );
};

export default MainLayout;