import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  
  /* This is the animation logic, now applied to the whole group */
  transition: top 0.3s ease-out;
  /* Hides both the ticker (40px) and navbar (80px) */
  top: ${({ $visible }) => ($visible ? '0' : '-120px')}; 
`;