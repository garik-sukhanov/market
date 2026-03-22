import { type ComponentProps, forwardRef } from "react";
import styled, { css } from "styled-components";

export type CheckboxVariant = "check" | "filled";

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  variant?: CheckboxVariant;
};

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })<{
  $variant: CheckboxVariant;
}>`
  width: 22px;
  height: 22px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 4px;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-color: ${({ theme, $variant }) =>
      $variant === "check" ? theme.colors.darkBlue : theme.colors.grey3};
  }

  &:indeterminate {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-color: ${({ theme, $variant }) =>
      $variant === "check" ? theme.colors.darkBlue : theme.colors.grey3};
  }

  ${({ $variant, theme }) =>
    $variant === "check"
      ? css`
          &::after {
            content: "";
            width: 6px;
            height: 10px;
            border: solid ${theme.colors.bgContainer};
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            opacity: 0;
          }

          &:checked::after {
            opacity: 1;
          }

          &:indeterminate::after {
            width: 10px;
            height: 2px;
            border: none;
            background-color: ${theme.colors.bgContainer};
            transform: none;
            opacity: 1;
          }
        `
      : css`
          &::after {
            content: none;
          }
        `}
`;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant = "check", ...props }, ref) => (
    <StyledCheckbox ref={ref} $variant={variant} {...props} />
  ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
