import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bgLight};
    padding: 60px 24px;
`;

export const FooterWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    /* This grid-template-columns is already perfectly responsive! */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
`;

export const FooterColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ColumnTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.bgWhite};
    margin-bottom: 10px;
    position: relative;
    
    /* Underline accent */
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 30px;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.accent};
    }
`;

export const AboutText = styled.p`
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.bgLight}; 
`;

export const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colors.bgLight};
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
`;

export const ValueList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ValueItem = styled.li`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.bgLight};
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    /* Checkmark icon before each value */
    &::before {
        content: '✓';
        color: ${({ theme }) => theme.colors.accent};
        margin-right: 8px;
        font-weight: bold;
    }
`;

export const PaymentIconsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const PaymentIcon = styled.img`
    height: 25px;
`;

export const SocialMediaWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1); 

    /* --- THIS IS THE ONLY CHANGE --- */
    @media screen and (max-width: 768px) {
        flex-direction: column; /* Stack items vertically */
        gap: 20px; /* Add space between copyright and icons */
    }
    /* --- END OF CHANGE --- */
`;

export const CopyrightText = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.bgLight};
    text-align: center; /* Ensure it's centered when stacked */
`;

export const SocialIcons = styled.div`
    display: flex;
    gap: 15px;
`;

export const SocialIconLink = styled.a`
    color: ${({ theme }) => theme.colors.bgWhite};
    font-size: 20px;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
        transform: translateY(-2px);
    }
`;