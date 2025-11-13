import styled from "styled-components";
import { Link } from "react-router-dom";

/* ==========================================
   NAVBAR HEIGHTS
========================================== */
export const NAVBAR_HEIGHT = 70;
export const TICKER_HEIGHT = 30;

/* ==========================================
   1. TICKER BAR
========================================== */
export const TickerBar = styled.div`
  width: 100%;
  height: ${TICKER_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  overflow: hidden;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export const TickerContent = styled.div`
  display: flex;
  white-space: nowrap;
  animation: scroll 20s linear infinite;

  @keyframes scroll {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const TickerItem = styled.span`
  padding: 0 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

/* ==========================================
   2. NAVBAR WRAPPER
========================================== */
export const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: ${TICKER_HEIGHT}px;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
`;

/* ==========================================
   3. NAVBAR CONTAINER
========================================== */
export const NavbarContainer = styled.div`
  max-width: 1300px;
  height: ${NAVBAR_HEIGHT}px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

/* ==========================================
   4. LOGO SECTION
========================================== */
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const LogoImage = styled.img`
  width: 45px;
  height: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 38px;
  }
`;

export const NavCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavTagline = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const NavSubTagline = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

/* ==========================================
   5. RIGHT ACTIONS
========================================== */
export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SchoolsLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ==========================================
   6. HAMBURGER BUTTON
========================================== */
export const MoreOptionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textDark};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.4s ease, color 0.3s ease;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

/* ==========================================
   7. MODERN SLIDE-IN DROPDOWN MENU
========================================== */
export const DropdownMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 78%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "-8px 0 25px rgba(0,0,0,0.15)" : "none"};
  transition: right 0.4s ease, opacity 0.3s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  padding: 100px 40px;
  z-index: 9999;
  overflow-y: auto;
  animation: ${({ $isOpen }) => ($isOpen ? "fadeIn 0.5s ease" : "none")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    width: 75%;
    padding: 80px 30px;
  }
`;

/* ==========================================
   8. DROPDOWN LINKS
========================================== */
export const DropdownLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDark};
  padding: 14px 0;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all 0.3s ease;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }

  &:last-child {
    border-bottom: none;
  }
`;
