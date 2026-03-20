import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bgContainer};
  border-radius: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  border: 2px solid ${({ theme }) => theme.colors.textBase};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 400px;
  width: 100%;
`;

const CardTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textBase};
`;

export { Card, CardTitle };
