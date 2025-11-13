import React from 'react';
import {
  FooterContainer,
  FooterWrapper,
  FooterColumn,
  ColumnTitle,
  AboutText,
  FooterLink,
  ValueList,
  ValueItem,
  PaymentIconsWrapper,
  PaymentIcon,
  SocialMediaWrapper,
  CopyrightText,
  SocialIcons,
  SocialIconLink
} from '../../styles/FooterStyle';

// Import social media icons
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

// Placeholder payment icons - you will need to replace these with your actual image paths
const visaIcon = 'https://placehold.co/50x32/white/black?text=VISA';
const mastercardIcon = 'https://placehold.co/50x32/white/black?text=MC';
const paypalIcon = 'https://placehold.co/50x32/white/black?text=PayPal';
const gpayIcon = 'https://placehold.co/50x32/white/black?text=GPay';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        {/* --- Column 1: About Us --- */}
        <FooterColumn>
          <ColumnTitle>About AEIS</ColumnTitle>
          <AboutText>
            Discover our commitment to excellence. We provide schools with the best syllabus books, teacher training, and materials at affordable prices, because every child deserves the best education.
          </AboutText>
        </FooterColumn>

        {/* --- Column 2: Mission & Vision (Updated from your notes) --- */}
        <FooterColumn>
          <ColumnTitle>Our Mission</ColumnTitle>
          <AboutText>
            To cultivate intellectual curiosity, critical thinking, and a lifelong love of learning in our students. We provide the best education to improve their life skills and bring out their own real talent.
          </AboutText>
          <ColumnTitle style={{ marginTop: '20px' }}>Our Vision</ColumnTitle>
          <AboutText>
            To be a leading educational institution that empowers students to become innovative leaders, creative problem-solvers, and engaged global citizens.
          </AboutText>
        </FooterColumn>

        {/* --- Column 3: Core Values & Links (Updated from your notes) --- */}
        <FooterColumn>
          <ColumnTitle>Core Values</ColumnTitle>
          <ValueList>
            <ValueItem>Integrity</ValueItem>
            <ValueItem>Collaboration</ValueItem>
            <ValueItem>Equality of Students</ValueItem>
            <ValueItem>Continuous Improvement</ValueItem>
            <ValueItem>Student-Centric Approach</ValueItem>
          </ValueList>
          <ColumnTitle style={{ marginTop: '20px' }}>Quick Links</ColumnTitle>
          <FooterLink to="/programs">Programs</FooterLink>
          <FooterLink to="/about-us">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterColumn>
        
        {/* --- Column 4: Payments & Contact --- */}
        <FooterColumn>
          <ColumnTitle>Accepted Payments</ColumnTitle>
          <PaymentIconsWrapper>
            <PaymentIcon src={visaIcon} alt="Visa" />
            <PaymentIcon src={mastercardIcon} alt="Mastercard" />
            <PaymentIcon src={paypalIcon} alt="PayPal" />
            <PaymentIcon src={gpayIcon} alt="Google Pay" />
          </PaymentIconsWrapper>
           <ColumnTitle style={{ marginTop: '20px' }}>Contact Us</ColumnTitle>
           <AboutText>
             Hyderabad, Telangana, India<br/>
             Email: contact@aeis.com<br/>
             Phone: +91 12345 67890
           </AboutText>
        </FooterColumn>

      </FooterWrapper>

      {/* --- Bottom Bar --- */}
      <SocialMediaWrapper>
        <CopyrightText>&copy; {currentYear} AEIS. All rights reserved.</CopyrightText>
        <SocialIcons>
          <SocialIconLink href="https://facebook.com" target="_blank" aria-label="Facebook"><FaFacebook /></SocialIconLink>
          <SocialIconLink href="https://instagram.com" target="_blank" aria-label="Instagram"><FaInstagram /></SocialIconLink>
          <SocialIconLink href="https://youtube.com" target="_blank" aria-label="YouTube"><FaYoutube /></SocialIconLink>
          <SocialIconLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><FaLinkedin /></SocialIconLink>
        </SocialIcons>
      </SocialMediaWrapper>
    </FooterContainer>
  );
};

export default Footer;
