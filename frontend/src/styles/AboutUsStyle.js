import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  padding: 80px 24px;
  background-color: #f9f9f9; /* A light grey background */
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ColumnLeft = styled.div``;

export const ColumnRight = styled.div``;

export const Image = styled.img`
  width: 100%;
  border-radius: 12px;
`;

export const Title = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 32px;
`;

export const Button = styled(Link)`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;