import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";

import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconUser,
  IconX,
} from "@/shared/assets";
import {
  Button,
  ErrorText,
  Input,
  InputWrapper,
  Label,
} from "@/shared/components/ui";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RememberRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const RememberText = styled.span`
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.grey4};
`;

const AuthCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid #ededed;
  background: ${({ theme }) => theme.colors.white};
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked::after {
    content: "";
    width: 7px;
    height: 12px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const AuthButton = styled(Button)`
  border-radius: 12px;
  padding: 16px 8px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.18px;
  line-height: 1.2;
  box-shadow: 0 8px 7px rgba(54, 122, 255, 0.03);
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const OrLine = styled.div`
  height: 1px;
  background: #ededed;
  flex: 1;
`;

const OrText = styled.span`
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #ebebeb;
`;

const IconButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const loginSchema = z.object({
  username: z.string().min(4, "Не менее 4 символов"),
  password: z.string().min(8, "Не менее 8 символов"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onFinish?: (values: LoginFormValues) => void;
  id?: string;
}

export const LoginForm = ({ onFinish, id }: LoginFormProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    reValidateMode: "onChange",
  });

  const onSubmit = (data: LoginFormValues) => {
    onFinish?.(data);
  };

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Fields>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputWrapper $variant="auth">
              <Label $variant="auth" htmlFor="login-username">
                Логин
              </Label>
              <Input
                {...field}
                id="login-username"
                $variant="auth"
                $error={!!errors.username}
                $fullWidth
                placeholder="Введите логин"
                autoComplete="username"
                $prefix={<IconUser style={{ color: "#EDEDED" }} />}
                $suffixInteractive={!!field.value}
                $suffix={
                  <IconButton
                    type="button"
                    aria-label="Очистить логин"
                    disabled={!field.value}
                    tabIndex={field.value ? 0 : -1}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setValue("username", "", {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  >
                    <IconX style={{ color: "#C9C9C9" }} />
                  </IconButton>
                }
              />
              {errors.username && (
                <ErrorText>{errors.username.message}</ErrorText>
              )}
            </InputWrapper>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputWrapper $variant="auth">
              <Label $variant="auth" htmlFor="login-password">
                Пароль
              </Label>
              <Input
                {...field}
                id="login-password"
                type={isPasswordVisible ? "text" : "password"}
                $variant="auth"
                $error={!!errors.password}
                $fullWidth
                placeholder="Введите пароль"
                autoComplete="current-password"
                $prefix={<IconLock style={{ color: "#EDEDED" }} />}
                $suffixInteractive
                $suffix={
                  <IconButton
                    type="button"
                    aria-label={
                      isPasswordVisible ? "Скрыть пароль" : "Показать пароль"
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPasswordVisible((value) => !value)}
                  >
                    {isPasswordVisible ? (
                      <IconEye style={{ color: "#EDEDED" }} />
                    ) : (
                      <IconEyeOff style={{ color: "#EDEDED" }} />
                    )}
                  </IconButton>
                }
              />
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </InputWrapper>
          )}
        />
      </Fields>

      <RememberRow>
        <AuthCheckbox name="rememberMe" />
        <RememberText>Запомнить данные</RememberText>
      </RememberRow>

      <AuthButton
        type="submit"
        $variant="primary"
        $fullWidth
        disabled={!!errors.username || !!errors.password}
      >
        Войти
      </AuthButton>

      <OrDivider aria-hidden="true">
        <OrLine />
        <OrText>или</OrText>
        <OrLine />
      </OrDivider>
    </Form>
  );
};
