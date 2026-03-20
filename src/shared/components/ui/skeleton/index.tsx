import type { ComponentProps } from 'react';
import styled, { keyframes } from 'styled-components';

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface SkeletonProps extends ComponentProps<'div'> {
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
  border-radius: ${({ $borderRadius, theme }) =>
    $borderRadius || theme.spacing[1]};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgContainer} 25%,
    ${({ theme }) => theme.colors.bgBase} 37%,
    ${({ theme }) => theme.colors.bgContainer} 63%
  );
  background-size: 400% 100%;
  animation: ${skeletonKeyframes} 1.4s ease infinite;
`;
