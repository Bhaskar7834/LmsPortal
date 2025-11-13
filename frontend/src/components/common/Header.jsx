import React, { useState, useEffect } from 'react';
import Ticker from './Ticker'; // <-- 1. ADD THIS IMPORT BACK
import Navbar from './Navbar';
import { HeaderWrapper } from '../../styles/HeaderStyle';

// Custom hook for scroll visibility (using "show on scroll up" logic)
const useScrollVisibility = (scrollThreshold = 80) => { // Threshold matches Navbar height
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // If scrolled down past threshold, hide
            if (window.scrollY > lastScrollY && window.scrollY > scrollThreshold) {
                setVisible(false);
            } else { // If scrolled up, show
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, scrollThreshold]); // Add scrollThreshold to dependency array
    return visible;
};

const Header = () => {
  // Use the custom hook to get visibility state
  const isVisible = useScrollVisibility(128); // Use combined height for trigger

  return (
    // This wrapper handles the fixed position and animation
    <HeaderWrapper $visible={isVisible}>
      <Ticker /> {/* <-- 2. ADD THE TICKER COMPONENT HERE */}
      <Navbar />
    </HeaderWrapper>
  );
};

export default Header;