import type { ComponentProps } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface SpinProps extends ComponentProps<'div'> {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const SpinContainer = styled.div<SpinProps>`
  display: inline-block;
  width: ${({ size }) =>
    size === 'small' ? '16px' : size === 'large' ? '48px' : '32px'};
  height: ${({ size }) =>
    size === 'small' ? '16px' : size === 'large' ? '48px' : '32px'};
  border: 3px solid ${({ theme, color }) => color || theme.colors.bgContainer};
  border-top-color: ${({ theme, color }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export const Spin = ({ size = 'medium', color }: SpinProps) => {
  return <SpinContainer size={size} color={color} />;
};
