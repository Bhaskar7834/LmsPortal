import styled from 'styled-components';

export const ProgramsSection = styled.section`
  padding: 80px 24px;
  background-color: #fff; /* Clean white background */
`;

export const SectionTitle = styled.h1`
  font-size: 42px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const ProgramsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgramCard = styled.div`
  background: #f9f9f9; /* Light grey card background */
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 24px;
  border: 1px solid #eee;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  }
`;

export const ProgramImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

export const ProgramInfo = styled.div`
  text-align: left;
`;

export const ProgramTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 8px 0;
`;

export const ProgramDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 16px 0;
  line-height: 1.6;
`;

export const ProgramLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
`;