import styled from "styled-components";

const Card = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: min(527px, 100%);
  max-width: none;
  border: none;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CardTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textBase};
`;

export { Card, CardTitle };
