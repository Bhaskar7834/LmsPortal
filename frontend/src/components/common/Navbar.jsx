import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaUserShield } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  LogoWrapper,
  NavLogo,
  LogoImage,
  NavCenter,
  NavTagline,
  NavSubTagline,
  NavActions,
  SchoolsLink,
  NavButton,
  DropdownLink,
  TickerBar,
  TickerContent,
  TickerItem,
  MoreOptionsButton,
  DropdownMenu,
} from "../../styles/NavbarStyle";
import aeisLogo from "../../assets/aeis-logo.png";
import parentStudentIcon from "../../assets/parent-student-icon.png";

// ✅ Hook: Show/hide ticker based on scroll
const useScrollVisibility = (scrollThreshold = 50) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < scrollThreshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);
  return visible;
};

// ✅ Hook: Detect click outside to close menu
const useOutsideClick = (ref, toggleRef, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, toggleRef, callback]);
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const isVisible = useScrollVisibility(50);
  useOutsideClick(menuRef, toggleRef, () => setIsMenuOpen(false));

  // ✅ Load user role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setUserRole(token ? role : null);
  }, []);

  // ✅ Navigation Handlers
  const handleStudentLogin = () => {
    setIsMenuOpen(false);
    navigate("/studentsignin");
  };
  const handleAdminLogin = () => {
    setIsMenuOpen(false);
    navigate("/admin-login");
  };
  const handleSignup = () => {
    setIsMenuOpen(false);
    navigate("/studentsignup");
  };
  const handleDashboard = () => {
    setIsMenuOpen(false);
    navigate(userRole === "admin" ? "/admin/dashboard" : "/dashboard");
  };
  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setIsMenuOpen(false);
    navigate("/");
  };
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // ✅ Scrolling ticker content
  const locations = ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu"];
  const scrollingLocations = [...locations, ...locations];

  return (
    <>
      {/* === Location Ticker === */}
      <TickerBar $visible={isVisible}>
        <TickerContent>
          {scrollingLocations.map((loc, i) => (
            <TickerItem key={i}>{loc}</TickerItem>
          ))}
        </TickerContent>
      </TickerBar>

      {/* === Navbar === */}
      <Nav $visible={isVisible}>
        <NavbarContainer>
          {/* === Left: Logo === */}
          <LogoWrapper>
            <NavLogo to="/" onClick={() => setIsMenuOpen(false)}>
              <LogoImage src={aeisLogo} alt="AEIS Logo" />
            </NavLogo>
            <img
              src={parentStudentIcon}
              alt="Parent Student Icon"
              style={{ width: 42, marginLeft: 8 }}
            />
          </LogoWrapper>

          {/* === Center: Tagline === */}
          <NavCenter>
            <NavTagline>LEARN, PRACTICE, AND ACHIEVE.</NavTagline>
            <NavSubTagline>Learn with ease.</NavSubTagline>
          </NavCenter>

          {/* === Right: Desktop Links === */}
          <NavActions>
            <SchoolsLink to="/courses">Courses</SchoolsLink>

            {userRole ? (
              <>
                <NavButton onClick={handleDashboard}>
                  {userRole === "admin" ? <FaUserShield /> : <FaUser />}
                  <span>{userRole === "admin" ? "Admin Panel" : "Dashboard"}</span>
                </NavButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavButton onClick={handleStudentLogin}>
                  <FaUser />
                  <span>Student Login</span>
                </NavButton>
                <NavButton onClick={handleSignup}>Signup</NavButton>
              </>
            )}

            {/* ✅ Animated Hamburger with visible close icon */}
            <MoreOptionsButton
              ref={toggleRef}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              $isOpen={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </MoreOptionsButton>
          </NavActions>
        </NavbarContainer>

        {/* === Mobile Sidebar Drawer === */}
        <DropdownMenu ref={menuRef} $isOpen={isMenuOpen}>
          {/* Close icon inside drawer (top right corner) */}
          <FaTimes
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "absolute",
              top: 18,
              right: 20,
              fontSize: "1.6rem",
              color: "#e63946",
              cursor: "pointer",
              zIndex: 1001,
            }}
          />

          <DropdownLink to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </DropdownLink>
          <DropdownLink to="/courses" onClick={() => setIsMenuOpen(false)}>
            Courses
          </DropdownLink>
          <DropdownLink to="/pricing" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </DropdownLink>

          {userRole ? (
            <>
              <DropdownLink as="button" onClick={handleDashboard}>
                {userRole === "admin" ? "Admin Panel" : "Dashboard"}
              </DropdownLink>
              <DropdownLink as="button" onClick={handleLogout}>
                Logout
              </DropdownLink>
            </>
          ) : (
            <>
              <DropdownLink as="button" onClick={handleStudentLogin}>
                Student Login
              </DropdownLink>
              <DropdownLink as="button" onClick={handleAdminLogin}>
                Admin Login
              </DropdownLink>
              <DropdownLink as="button" onClick={handleSignup}>
                Signup
              </DropdownLink>
            </>
          )}
        </DropdownMenu>

        {/* === Dim Overlay === */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(3px)",
              zIndex: 998,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </Nav>
    </>
  );
};

export default Navbar;
