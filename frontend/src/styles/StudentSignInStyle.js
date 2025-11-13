import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* --- CHANGED: from min-height to height --- */
  width: 100%;
  background-color: #f8f9fa;
  padding: 20px; /* Reduced padding slightly */
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export const BackgroundWave = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%23e9ecef" fill-opacity="1" d="M0,160L48,170.7C96,181,192,203,288,218.7C384,235,480,245,576,234.7C672,224,768,192,864,176C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  z-index: 1;
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 380px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  z-index: 2;
  text-align: center;
`;

export const Logo = styled.div`
  margin-bottom: 20px;
`;

export const LogoImage = styled.img`
  height: 50px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #667085;
  margin-bottom: 30px;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #aaa;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(237, 28, 36, 0.2);
  }
`;

export const ForgotPasswordLink = styled.a`
  text-align: right;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  margin-bottom: 25px;
  display: block;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(237, 28, 36, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const HelpLink = styled.p`
  text-align: center;
  margin-top: 25px;
  font-size: 13px;
  color: #667085;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    text-decoration: none;
  }
`;