import styled from "styled-components";

/* ===============================
   🌟 Layout & Wrappers
================================== */
export const Section = styled.section`
  padding: 80px 24px;
  background-color: ${({ theme }) => theme.colors.bgLight};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 50px;
`;

/* ===============================
   🧩 Grid System
================================== */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

/* ===============================
   🎴 Program Card Base
================================== */
export const ProgramCard = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12),
      0 0 0 3px
        ${({ theme, $clickable }) =>
          $clickable ? theme.colors.primary + "40" : "transparent"};
  }
`;

/* ===============================
   🖼️ Image Handling (16:9 fixed)
================================== */
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background: #f3f4f6;
  margin-bottom: 20px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, transparent 100%);
    pointer-events: none;
  }
`;

/* ===============================
   📝 Card Content
================================== */
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  flex-grow: 1;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 10px 0;
  text-align: left;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
  text-align: left;
`;

export const CardLink = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ===============================
   📊 Progress & Footer Area
================================== */
export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Small = styled.small`
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.7;
  font-size: 13px;
`;

export const ProgressWrap = styled.div`
  width: 100%;
  background: #e9ecef;
  border-radius: 50px;
  height: 8px;
  overflow: hidden;
  margin-top: 6px;
`;

export const ProgressBar = styled.div`
  height: 8px;
  border-radius: 50px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  transition: width 0.6s ease;
`;

/* ===============================
   🖼️ Optional Fallback (old Program.jsx)
================================== */
export const CardImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 12px;
`;
