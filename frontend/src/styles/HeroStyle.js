import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * The main section container.
 * - Uses a transient prop `$bgColor` for a configurable background.
 * - Defaults to white if no color is provided.
 */
export const Section = styled.section`
  /* Box Model */
  padding: 80px 24px;

  /* Appearance */
  background: ${({ $bgColor }) => $bgColor || '#fff'};
`;

/**
 * A standard container to enforce a maximum width and center content.
 */
export const Container = styled.div`
  /* Box Model */
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * The core layout wrapper using CSS Grid.
 * - `$imageOnLeft` prop dynamically swaps the column order using grid-template-areas.
 * - On mobile, it stacks the columns vertically for a responsive layout.
 */
export const Wrapper = styled.div`
  /* Layout */
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;

  /* Dynamic column ordering */
  grid-template-areas: ${({ $imageOnLeft }) =>
    $imageOnLeft ? `'col2 col1'` : `'col1 col2'`};

  /* Responsive stacking for tablets and smaller */
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'col2' /* Image column */
      'col1'; /* Text content column */
  }
`;

/**
 * The left column containing text content.
 */
export const ColumnLeft = styled.div`
  grid-area: col1;
`;

/**
 * The right column containing the image.
 */
export const ColumnRight = styled.div`
  grid-area: col2;
`;

/**
 * The section's feature image.
 * - `display: block` prevents extra whitespace below the image.
 * - A subtle scale transition on hover adds a nice interactive touch.
 */
export const Image = styled.img`
  /* Box Model & Layout */
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto; /* Center image in its column on mobile */

  /* Appearance */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* Effects */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

/**
 * The main heading for the section.
 */
export const Title = styled.h2`
  /* Typography */
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
  
  /* Box Model */
  margin-bottom: 24px;
`;

/**
 * The descriptive paragraph text.
 */
export const Description = styled.p`
  /* Typography */
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textDark};

  /* Box Model */
  margin-bottom: 32px;
`;

/**
 * The call-to-action button, styled as a Link.
 * - The hover effect now combines a transform and a more pronounced shadow.
 */
export const Button = styled(Link)`
  /* Layout & Box Model */
  display: inline-block; /* Ensures padding and transforms work correctly */
  padding: 12px 30px;
  border-radius: 50px;

  /* Typography */
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;

  /* Appearance */
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  /* Effects */
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;