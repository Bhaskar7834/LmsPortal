import styled from 'styled-components';

// Define heights again for use in transform
const TICKER_HEIGHT = 30; // Use your actual Ticker height
const NAVBAR_HEIGHT = 80; // Use your actual Navbar height
const TOTAL_HEIGHT = TICKER_HEIGHT + NAVBAR_HEIGHT;

export const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.bgWhite}; 
    z-index: 1000; 
    transition: transform 0.3s ease-in-out;
    
    /* --- THE CHANGE: Use exact pixel value for hiding --- */
    transform: ${({ $visible }) => ($visible ? 'translateY(0)' : `translateY(-${TOTAL_HEIGHT}px)`)};
    /* --- END CHANGE --- */

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;