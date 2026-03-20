import type { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'round';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ComponentProps<'button'> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $size = 'medium', theme }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: ${theme.spacing[1]} ${theme.spacing[2]};
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing[3]} ${theme.spacing[5]};
          font-size: 18px;
        `;
      default:
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: 16px;
        `;
    }
  }}

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: white;
          box-shadow: ${theme.shadows.primary};
          &:hover:not(:disabled) {
            filter: brightness(1.1);
          }
        `;
      case 'secondary':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.textBase};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.bgContainer};
          }
        `;
      case 'round':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
          }
          border-radius: 15px;
          min-width: 30px;
        `;
      default:
        return css``;
    }
  }}
`;

export { Button };
