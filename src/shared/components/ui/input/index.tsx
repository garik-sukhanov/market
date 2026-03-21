import { type ComponentProps, forwardRef } from "react";
import styled from "styled-components";

export type StyledInputProps = ComponentProps<"input"> & {
  $error?: boolean;
  $fullWidth?: boolean;
  $prefix?: React.ReactNode;
  $suffix?: React.ReactNode;
};

type InternalInputProps = Omit<StyledInputProps, "$prefix" | "$suffix"> & {
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
};

const StyledInput = styled.input<InternalInputProps>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  padding-left: ${({ theme, $hasPrefix }) =>
    $hasPrefix
      ? `calc(${theme.spacing[4]} + ${theme.spacing[24]})`
      : theme.spacing[4]};
  padding-right: ${({ theme, $hasSuffix }) =>
    $hasSuffix
      ? `calc(${theme.spacing[4]} + ${theme.spacing[24]})`
      : theme.spacing[4]};
  border-radius: ${({ theme }) => theme.spacing[12]};
  border: 2px solid
    ${({ theme, $error }) => ($error ? "#ff4d4f" : theme.colors.bgContainer)};
  background-color: ${({ theme }) => theme.colors.bgBase};
  color: ${({ theme }) => theme.colors.textBase};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  outline: none;
  height: ${({ theme }) => theme.spacing[48]};

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? "#ff4d4f" : theme.colors.primary};
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textBase}80;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bgContainer};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const InputAffixContainer = styled.div<{
  $fullWidth?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const InputAffix = styled.span<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position, theme }) =>
    $position === "left"
      ? `left: ${theme.spacing[20]};`
      : `right: ${theme.spacing[20]};`}
  width: ${({ theme }) => theme.spacing[24]};
  height: ${({ theme }) => theme.spacing[24]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => `${theme.colors.textBase}80`};
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }

  svg * {
    stroke: currentColor;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const Input = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ $prefix, $suffix, $fullWidth, ...props }, ref) => {
    const hasPrefix = !!$prefix;
    const hasSuffix = !!$suffix;

    if (!hasPrefix && !hasSuffix) {
      return <StyledInput ref={ref} $fullWidth={$fullWidth} {...props} />;
    }

    return (
      <InputAffixContainer $fullWidth={$fullWidth} $disabled={props.disabled}>
        {hasPrefix && <InputAffix $position="left">{$prefix}</InputAffix>}
        <StyledInput
          ref={ref}
          $fullWidth={$fullWidth}
          $hasPrefix={hasPrefix}
          $hasSuffix={hasSuffix}
          {...props}
        />
        {hasSuffix && <InputAffix $position="right">{$suffix}</InputAffix>}
      </InputAffixContainer>
    );
  },
);

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textBase};
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #ff4d4f;
`;

const TextArea = styled.textarea<StyledInputProps>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.spacing[2]};
  border: 2px solid
    ${({ theme, $error }) => ($error ? "#ff4d4f" : theme.colors.bgContainer)};
  background-color: ${({ theme }) => theme.colors.bgBase};
  color: ${({ theme }) => theme.colors.textBase};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  outline: none;
  resize: vertical;
  min-height: 100px;
  border-color: ${({ theme }) => theme.colors.grey3};

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? "#ff4d4f" : theme.colors.primary};
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textBase}80;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bgContainer};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export { ErrorText, Input, InputWrapper, Label, TextArea };
