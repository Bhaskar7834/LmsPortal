import styled from 'styled-components';

export const ProgramsSection = styled.section`
    padding: 80px 24px;
    /* Uses the standard light background for the section area */
    background-color: ${({ theme }) => theme.colors.bgLight};
`;

export const ProgramsContainer = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
`;

export const ProgramsH1 = styled.h1`
    font-size: 36px;
    /* 💡 Graded: Use the DARK TEAL/Primary color for the main heading */
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 48px;
    @media screen and (max-width: 768px) {
        font-size: 30px;
    }
`;

export const ProgramsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media screen and (max-width: 820px) {
        grid-template-columns: 1fr;
    }
`;

export const ProgramCard = styled.div`
    /* Card background is pure white */
    background: ${({ theme }) => theme.colors.bgWhite};
    border-radius: 12px;
    /* Uses a standard, subtle neutral shadow */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    padding: 24px;
    gap: 20px;
    text-align: left;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        /* Optional: Add subtle accent highlight on hover */
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), 0 0 0 2px ${({ theme }) => theme.colors.accent};
    }
`;

export const ProgramImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: contain;

    @media screen and (max-width: 480px) {
        width: 80px;
        height: 80px;
    }
`;

export const ProgramInfo = styled.div``;

export const ProgramTitle = styled.h3`
    font-size: 22px;
    font-weight: 700;
    /* 💡 Graded: Use the Primary Dark Teal for strong titles */
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 8px 0;
`;

export const ProgramDescription = styled.p`
    font-size: 16px;
    /* Text body color */
    color: ${({ theme }) => theme.colors.textDark};
    margin: 0 0 16px 0;
`;

export const ProgramLink = styled.a`
    font-size: 16px;
    font-weight: 600;
    /* 💡 Graded: Use the Secondary Bright Blue for action links */
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
        /* Optional: Red accent on hover to draw attention */
        color: ${({ theme }) => theme.colors.accent};
    }
`;