import React from 'react';
import {
  TickerBar, 
  TickerContent, 
  TickerItem
} from '../../styles/TickerStyle'; // Styles moved to a dedicated file

const Ticker = () => {
  const locations = [
    "Andhra Pradesh", 
    "Telangana", 
    "Karnataka", 
    "And many more cities..."
  ];
  // Duplicate list for seamless scrolling
  const scrollingLocations = [...locations, ...locations]; 

  return (
    // TickerBar no longer needs $visible; the parent Header handles visibility
    <TickerBar> 
      <TickerContent>
        {scrollingLocations.map((location, index) => (
          <TickerItem key={index}>{location}</TickerItem>
        ))}
      </TickerContent>
    </TickerBar>
  );
};

export default Ticker;