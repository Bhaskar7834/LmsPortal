import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px;
  background-color: #f8f9fa;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #667085;
  margin-bottom: 50px;
`;

export const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Desktop-only 3-column layout */
  gap: 30px;
  width: 100%;
  max-width: 1100px;
`;

export const PlanCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 3px solid transparent;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth transition for all effects */

  /* --- NEW: Modern "Breathing Glow" Hover Effect --- */
  &:hover {
    transform: translateY(-10px); /* Lift the card on hover */
    box-shadow: 0 12px 40px ${({ theme }) => `${theme.colors.accent}20`}; /* Soft red glow */
  }

  /* --- UPDATED: Use RED for the active card --- */
  border-color: ${({ active, theme }) => (active ? theme.colors.accent : 'transparent')};
  
  /* The 'Best Value' card is slightly larger by default */
  transform: ${({ bestValue }) => (bestValue ? 'scale(1.05)' : 'scale(1)')};
  /* The active card also gets the scale effect */
  transform: ${({ active }) => (active ? 'scale(1.05)' : 'scale(1)')};
`;

export const BestValueTag = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  /* --- UPDATED: Use RED for the tag --- */
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: bold;
`;

export const PlanTitle = styled.h2`
  font-size: 24px;
  margin: 10px 0;
`;

export const Price = styled.p`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const PricePeriod = styled.p`
  color: #667085;
  margin: 0 0 20px 0;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  color: #333;
`;

export const FeatureItem = styled.li`
  margin-bottom: 10px;
`;

export const PlanButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  /* --- UPDATED: Use RED for the button border --- */
  border: 2px solid ${({ theme }) => theme.colors.accent};
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

export const MaterialSection = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 60px;
  padding: 30px;
  background: #fdecec; /* A soft red-tinted background to match */
  border-radius: 16px;
  text-align: center;
`;

export const MaterialTitle = styled.h3`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 20px 0;
`;

export const MaterialItems = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #333;

  svg {
    /* --- UPDATED: Use RED for the icons --- */
    color: ${({ theme }) => theme.colors.accent};
    font-size: 20px;
  }
`;

export const MaterialCost = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FinalCtaButton = styled.button`
  margin-top: 40px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 16px 60px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(237, 28, 36, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(237, 28, 36, 0.5);
  }
`;