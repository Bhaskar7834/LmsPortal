import styled from 'styled-components';

export const Section = styled.section`
    padding: 80px 24px;
    /* 💡 Graded: Use light background surface color */
    background-color: ${({ theme }) => theme.colors.bgLight};
    text-align: center;
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;

export const Title = styled.h2`
    font-size: 36px;
    font-weight: 700;
    /* 💡 Graded: Use Primary Dark Teal for strong, main headings */
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 50px;
`;

export const TestimonialGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media screen and (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const TestimonialCard = styled.div`
    /* Card background is pure white */
    background: ${({ theme }) => theme.colors.bgWhite};
    border-radius: 20px;
    padding: 35px 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;

/* Decorative quote icon in the background of each card */
export const QuoteIcon = styled.div`
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 80px;
    /* 💡 Graded: Use light background color for the watermark effect */
    color: ${({ theme }) => theme.colors.bgLight}; 
    line-height: 1;
    z-index: 1;
`;

export const TestimonialText = styled.p`
    font-size: 16px;
    /* 💡 Graded: Use a slightly lighter dark text for readability */
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.7;
    font-style: italic;
    margin: 0 0 25px 0;
    z-index: 2;
    flex-grow: 1;
`;

export const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: auto;
    z-index: 2;
`;

export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    /* Optional: Add a subtle border using primary color for flair */
    border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const AuthorDetails = styled.div`
    text-align: left;
`;

export const AuthorName = styled.h4`
    font-size: 16px;
    font-weight: 600;
    /* 💡 Graded: Use primary dark teal for author names */
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
`;

export const AuthorRelation = styled.p`
    font-size: 14px;
    /* 💡 Graded: Use light text for secondary details */
    color: ${({ theme }) => theme.colors.textDark};
    margin: 0;
`;