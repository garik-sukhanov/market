import type { ComponentProps } from 'react';
import styled from 'styled-components';

interface StyledInputProps extends ComponentProps<'input'> {
  $error?: boolean;
  $fullWidth?: boolean;
}

const Input = styled.input<StyledInputProps>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.spacing[2]};
  border: 2px solid
    ${({ theme, $error }) => ($error ? '#ff4d4f' : theme.colors.bgContainer)};
  background-color: ${({ theme }) => theme.colors.bgBase};
  color: ${({ theme }) => theme.colors.textBase};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? '#ff4d4f' : theme.colors.primary};
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
    ${({ theme, $error }) => ($error ? '#ff4d4f' : theme.colors.bgContainer)};
  background-color: ${({ theme }) => theme.colors.bgBase};
  color: ${({ theme }) => theme.colors.textBase};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? '#ff4d4f' : theme.colors.primary};
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
