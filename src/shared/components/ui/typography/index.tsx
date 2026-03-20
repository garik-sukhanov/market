import type { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';

interface TypographyProps extends ComponentProps<'span'> {
  $variant?: TypographyVariant;
  $color?: string;
  $weight?: number | string;
  $align?: 'left' | 'center' | 'right';
  $fullWidth?: boolean;
}

const getVariantStyles = (variant: TypographyVariant = 'body') => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: 32px;
        line-height: 1.2;
        font-weight: 700;
      `;
    case 'h2':
      return css`
        font-size: 24px;
        line-height: 1.3;
        font-weight: 600;
      `;
    case 'h3':
      return css`
        font-size: 20px;
        line-height: 1.4;
        font-weight: 600;
      `;
    case 'h4':
      return css`
        font-size: 18px;
        line-height: 1.4;
        font-weight: 500;
      `;
    case 'small':
      return css`
        font-size: 12px;
        line-height: 1.5;
      `;
    case 'body':
    default:
      return css`
        font-size: 16px;
        line-height: 1.5;
      `;
  }
};

const Typography = styled.span<TypographyProps>`
  color: ${({ $color, theme }) => $color || theme.colors.textBase};
  font-weight: ${({ $weight }) => $weight || 'normal'};
  text-align: ${({ $align }) => $align || 'left'};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  margin: 0;

  ${({ $variant }) => getVariantStyles($variant)}
`;

export { Typography };
