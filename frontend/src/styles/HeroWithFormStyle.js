import styled, { css } from 'styled-components';

export const HeroSection = styled.section`
    /* Use light background from theme */
    background-color: ${({ theme }) => theme.colors.bgLight};
    padding: 60px 24px; /* Adjusted padding */
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeroWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1100px;
    width: 100%;
    /* Use white background from theme */
    background: ${({ theme }) => theme.colors.bgWhite};
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    /* This is your existing, correct rule for stacking */
    @media screen and (max-width: 960px) {
        grid-template-columns: 1fr;
    }
`;

export const ImageContainer = styled.div`
    /* Use light background from theme */
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.bgLight} 0%, #f9f9f9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    box-sizing: border-box; /* Ensure padding is included */
`;

export const Image = styled.img`
    width: 100%;
    max-width: 450px;
    height: auto;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
`;

export const FormColumn = styled.div`
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Polish: Add more vertical and less horizontal padding on mobile */
    @media screen and (max-width: 960px) {
        padding: 40px 24px;
    }
`;

export const FormContainer = styled.form`
    width: 100%;
    max-width: 400px;
`;

export const FormTitle = styled.h3`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    /* Use dark text from theme */
    color: ${({ theme }) => theme.colors.textDark};
    margin: 0 0 25px 0;

    /* Polish: Make title slightly smaller on mobile */
    @media screen and (max-width: 480px) {
        font-size: 22px;
    }
`;

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 15px;
    
    /* Polish: Stack the select inputs on mobile */
    @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    border: 1px solid #eee; /* Lighter border */
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 0 15px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;

    &:focus-within {
        /* Use accent red from theme */
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20; /* Soft red glow */
    }
`;

export const InputIcon = styled.div`
    color: #aaa; /* Lighter icon color */
    font-size: 16px;
    margin-right: 10px;
    display: flex;
    align-items: center;
`;

export const FormInput = styled.input`
    width: 100%;
    padding: 12px 0;
    border: none;
    background: transparent;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.textDark}; /* Use Theme */

    &::placeholder { 
        color: #aaa; 
    }
    &:focus { 
        outline: none; 
    }
`;

// SelectWrapper (Also graded for consistency)
export const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgWhite}; 
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 0 15px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;

    &:focus-within {
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
    }

    /* The custom triangle arrow */
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 15px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #aaa; /* Lighter arrow */
        transform: translateY(-50%);
        pointer-events: none;
    }
`;

export const FormSelect = styled.select`
    width: 100%;
    padding: 12px 0;
    border: none;
    background: transparent;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.textDark}; /* Use Theme */
    appearance: none;
    cursor: pointer;

    &:focus { outline: none; }
`;

export const FormButton = styled.button`
    width: 100%;
    margin-top: 15px;
    padding: 14px;
    border-radius: 10px;
    border: none;
    
    /* Use accent red from theme */
    background: ${({ theme }) => theme.colors.accent}; 
    color: ${({ theme }) => theme.colors.bgWhite}; 
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 6px 15px ${({ theme }) => theme.colors.accent}40; /* Red shadow */

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 18px ${({ theme }) => theme.colors.accent}60; /* Stronger red shadow */
    }
`;