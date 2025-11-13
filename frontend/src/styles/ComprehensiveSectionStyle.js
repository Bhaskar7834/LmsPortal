import styled from 'styled-components';

export const SectionContainer = styled.section`
    padding: 80px 24px;
    background-color: ${({ theme }) => theme.colors.bgLight};
    text-align: center;

    /* --- RESPONSIVE: Add padding for mobile --- */
    @media screen and (max-width: 768px) {
        padding: 60px 16px;
    }
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 16px;

    /* --- RESPONSIVE: Smaller title on mobile --- */
    @media screen and (max-width: 768px) {
        font-size: 28px;
    }
`;

export const Subtitle = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textDark};
    max-width: 700px;
    margin: 0 auto 32px auto;
    line-height: 1.6;

    /* --- RESPONSIVE: Smaller subtitle on mobile --- */
    @media screen and (max-width: 768px) {
        font-size: 15px;
    }
`;

export const ContentBox = styled.div`
    background: ${({ theme }) => theme.colors.bgWhite};
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;

    /* --- RESPONSIVE: Smaller padding on mobile --- */
    @media screen and (max-width: 768px) {
        padding: 24px 0;
    }
`;

export const ClassSelector = styled.div`
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bgWhite};
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 30px;
`;

export const CardsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 40px;

    /* --- RESPONSIVE: Stack cards vertically on mobile --- */
    @media screen and (max-width: 820px) {
        flex-direction: column;
        gap: 30px; /* Add gap between stacked cards */
        padding: 0 24px;
    }
`;

export const InfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: left;
    flex: 1;
    min-width: 320px;
    position: relative;

    /* --- RESPONSIVE: Stack image/text vertically on mobile --- */
    @media screen and (max-width: 480px) {
        flex-direction: column;
        text-align: center;
        min-width: unset;
        width: 100%;
    }
`;

export const VerticalSeparator = styled.div`
    width: 1px;
    background-color: ${({ theme }) => theme.colors.bgLight};
    height: 100px;
    
    @media screen and (max-width: 820px) {
        display: none; /* Hide separator when cards stack */
    }
`;

export const CardImage = styled.img`
    height: 110px;

    /* --- RESPONSIVE: Add space below image when stacked --- */
    @media screen and (max-width: 480px) {
        margin-bottom: 10px;
    }
`;

export const CardContent = styled.div`
    /* --- RESPONSIVE: Center-align content when stacked --- */
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const CardTitle = styled.h3`
    font-size: 20px;
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.colors.textDark};
`;

export const CardDescription = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.5;
    margin: 0 0 12px 0;
`;

export const CardLink = styled.a`
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary}; 
    text-decoration: none;
`;

export const NewTag = styled.div`
    position: absolute;
    top: -10px;
    right: 10px;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bgWhite};
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
`;

export const CtaWrapper = styled.div`
    margin-top: 30px;
`;

export const CtaButton = styled.button`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bgWhite};
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    padding: 14px 40px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(237, 28, 36, 0.4); 
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(237, 28, 36, 0.5);
    }
`;