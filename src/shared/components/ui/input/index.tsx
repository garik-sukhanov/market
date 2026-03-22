import { type ComponentProps, forwardRef } from "react";
import styled, { css } from "styled-components";

export type InputVariant = "default" | "auth";

export type StyledInputProps = ComponentProps<"input"> & {
  $error?: boolean;
  $fullWidth?: boolean;
  $prefix?: React.ReactNode;
  $suffix?: React.ReactNode;
  $wrapperProps?: ComponentProps<"div">;
  $variant?: InputVariant;
};

type InternalInputProps = Omit<
  StyledInputProps,
  "$prefix" | "$suffix" | "$wrapperProps"
> & {
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
};

const StyledInput = styled.input<InternalInputProps>`
  ${({ $variant = "default" }) =>
    $variant === "auth"
      ? css`
          padding: 14px 16px;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.27px;
          height: auto;
          border-radius: 12px;
        `
      : css`
          padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
          font-size: 16px;
          height: ${({ theme }) => theme.spacing[48]};
          border-radius: ${({ theme }) => theme.spacing[12]};
        `}

  padding-left: ${({ theme, $variant = "default", $hasPrefix }) =>
    $hasPrefix
      ? $variant === "auth"
        ? `calc(16px + 24px + 14px)`
        : `calc(${theme.spacing[4]} + ${theme.spacing[24]})`
      : $variant === "auth"
        ? "16px"
        : theme.spacing[4]};
  padding-right: ${({ theme, $variant = "default", $hasSuffix }) =>
    $hasSuffix
      ? $variant === "auth"
        ? `calc(16px + 24px + 14px)`
        : `calc(${theme.spacing[4]} + ${theme.spacing[24]})`
      : $variant === "auth"
        ? "16px"
        : theme.spacing[4]};

  border: ${({ theme, $variant = "default", $error }) => {
    if ($error) return "2px solid #ff4d4f";
    if ($variant === "auth") return "1.5px solid #ededed";
    return `2px solid ${theme.colors.bgContainer}`;
  }};
  background-color: ${({ theme, $variant = "default" }) =>
    $variant === "auth" ? theme.colors.white : theme.colors.bgBase};
  color: ${({ theme }) => theme.colors.textBase};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    border-color: ${({ theme, $error, $variant = "default" }) =>
      $error ? "#ff4d4f" : $variant === "auth" ? "#ededed" : theme.colors.primary};
    box-shadow: ${({ theme, $variant = "default" }) =>
      $variant === "auth" ? "none" : `0 0 0 2px ${theme.colors.primary}33`};
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
  $variant?: InputVariant;
}>`
  position: relative;
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const InputAffix = styled.span<{
  $position: "left" | "right";
  $variant?: InputVariant;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position, $variant = "default", theme }) => {
    if ($variant === "auth") {
      return $position === "left" ? "left: 16px;" : "right: 16px;";
    }
    return $position === "left"
      ? `left: ${theme.spacing[20]};`
      : `right: ${theme.spacing[20]};`;
  }}
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
  ({ $prefix, $suffix, $fullWidth, $wrapperProps, $variant, ...props }, ref) => {
    const hasPrefix = !!$prefix;
    const hasSuffix = !!$suffix;

    if (!hasPrefix && !hasSuffix) {
      return (
        <StyledInput
          ref={ref}
          $fullWidth={$fullWidth}
          $variant={$variant}
          {...props}
        />
      );
    }

    return (
      <InputAffixContainer
        $fullWidth={$fullWidth}
        $disabled={props.disabled}
        $variant={$variant}
        {...$wrapperProps}
      >
        {hasPrefix && (
          <InputAffix $position="left" $variant={$variant}>
            {$prefix}
          </InputAffix>
        )}
        <StyledInput
          ref={ref}
          $fullWidth={$fullWidth}
          $hasPrefix={hasPrefix}
          $hasSuffix={hasSuffix}
          $variant={$variant}
          {...props}
        />
        {hasSuffix && (
          <InputAffix $position="right" $variant={$variant}>
            {$suffix}
          </InputAffix>
        )}
      </InputAffixContainer>
    );
  },
);

export type InputWrapperProps = ComponentProps<"div"> & {
  $variant?: InputVariant;
};

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $variant = "default" }) =>
    $variant === "auth" ? "6px" : theme.spacing[2]};
  width: 100%;
`;

export type LabelProps = ComponentProps<"label"> & {
  $variant?: InputVariant;
};

const Label = styled.label<LabelProps>`
  color: ${({ theme }) => theme.colors.textBase};
  ${({ $variant = "default" }) =>
    $variant === "auth"
      ? css`
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.27px;
          line-height: 1.5;
        `
      : css`
          font-size: 14px;
          font-weight: 500;
        `}
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
