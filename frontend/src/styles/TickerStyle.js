import styled, { keyframes } from 'styled-components';

// --- CONSTANTS ---
const TICKER_HEIGHT = 30; // Your Ticker height (ensure consistent)
const ANIMATION_SPEED = '25s'; // Adjust speed if needed

// --- KEYFRAMES ---
const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); } /* Assuming 3 repetitions */
`;

// --- TICKER BAR STYLES ---
export const TickerBar = styled.div`
    /* Note: Position and Animation are handled by parent HeaderWrapper */
    height: ${TICKER_HEIGHT}px;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary}; /* Use Theme */
    color: ${({ theme }) => theme.colors.bgWhite}; /* Use Theme */
    box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
    font-size: 0.9rem;
    font-weight: 500;
    overflow: hidden; 
    white-space: nowrap;
    display: flex; 
    align-items: center;
`;

export const TickerContent = styled.div`
    display: inline-block; 
    padding-left: 100%; 
    animation: ${scrollAnimation} ${ANIMATION_SPEED} linear infinite; 
    display: flex; 
    align-items: center; 
    height: 100%;

    &:hover {
        animation-play-state: paused;
    }
`;

export const TickerItem = styled.span`
    display: inline-block; 
    padding: 0 40px; 
`;