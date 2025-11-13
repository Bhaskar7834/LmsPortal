// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#004358",    // Dark Teal from your logo
    secondary: "#00AEEF",  // Bright Blue from your logo
    accent: "#ED1C24",     // Red from your logo
    textDark: "#1D2F3F",   // Standard dark text
    bgWhite: "#FFFFFF",
    bgLight: "#f8f9fa",    // Light background for sections
  },
};

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.bgLight};
    color: ${({ theme }) => theme.colors.textDark};
    transition: background-color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6, p, ul, li { margin: 0; padding: 0; }
  a { text-decoration: none; color: inherit; }
  button { font-family: 'Poppins', sans-serif; }
  * { box-sizing: border-box; }
`;
