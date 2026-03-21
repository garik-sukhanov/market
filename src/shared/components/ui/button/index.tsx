import { type ComponentProps, forwardRef, type ReactNode } from "react";
import styled, { css } from "styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "round"
  | "pagination";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ComponentProps<"button"> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

type StyledButtonProps = Omit<ButtonProps, "icon" | "iconPosition">;

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[16]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $size = "medium", theme }) => {
    switch ($size) {
      case "small":
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: 14px;
        `;
      case "large":
        return css`
          padding: ${theme.spacing[8]} ${theme.spacing[12]};
          font-size: 18px;
        `;
      default:
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: 16px;
        `;
    }
  }}

  ${({ $variant = "primary", theme }) => {
    switch ($variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.bgContainer};
          border-radius: ${({ theme }) => theme.spacing[6]};
          padding: 10px 20px;
          &:hover:not(:disabled) {
            filter: brightness(1.1);
          }
        `;
      case "secondary":
        return css`
          background-color: transparent;
          border-color: ${theme.colors.grey2};
          color: ${theme.colors.primary};
          padding: 10px;
          border-radius: ${({ theme }) => theme.spacing[6]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: ${theme.colors.textBase};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.bgContainer};
          }
        `;
      case "round":
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
      case "pagination":
        return css`
          background-color: transparent;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
          }
        `;
      default:
        return css``;
    }
  }}
`;

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = "left", children, ...props }, ref) => {
    const hasChildren =
      children !== undefined && children !== null && children !== false;

    return (
      <StyledButton ref={ref} {...props}>
        {icon && iconPosition === "left" && (
          <IconContainer>{icon}</IconContainer>
        )}
        {hasChildren ? children : null}
        {icon && iconPosition === "right" && (
          <IconContainer>{icon}</IconContainer>
        )}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

export { Button };
