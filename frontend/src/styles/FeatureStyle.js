// src/styles/FeaturesStyle.js
import styled from 'styled-components';

export const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

export const FeaturesH1 = styled.h1`
  font-size: 42px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 64px;
`;

export const FeaturesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

export const FeatureCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  text-align: left;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 20px;
`;

export const FeatureH2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

export const FeatureP = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textDark};
`;