import type { ComponentProps } from 'react';
import styled from 'styled-components';

interface FlexProps extends ComponentProps<'div'> {
  $vertical?: boolean;
  $gap?: number | string;
  $align?: string;
  $justify?: string;
  $fullWidth?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  gap: ${({ $gap, theme }) => (typeof $gap === 'number' ? `${$gap}px` : $gap || theme.spacing[4])};
  align-items: ${({ $align }) => $align || 'stretch'};
  justify-content: ${({ $justify }) => $justify || 'flex-start'};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export { Flex };
