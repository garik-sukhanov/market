import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";

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

function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M17 10V8a5 5 0 0 0-10 0v2"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="#C9C9C9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEyeOff(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88 4.24A10.05 10.05 0 0 1 12 4c5 0 9 5 9 8 0 1.02-.4 2.11-1.1 3.18"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.11 6.11C4.12 7.79 3 10.02 3 12c0 3 4 8 9 8 1.2 0 2.34-.25 3.39-.68"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3l18 18"
        stroke="#EDEDED"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
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
                $suffix={<IconX style={{ color: "#C9C9C9" }} />}
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
                type="password"
                $variant="auth"
                $error={!!errors.password}
                $fullWidth
                placeholder="Введите пароль"
                autoComplete="current-password"
                $prefix={<IconLock style={{ color: "#EDEDED" }} />}
                $suffix={<IconEyeOff style={{ color: "#EDEDED" }} />}
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

      <AuthButton type="submit" $variant="primary" $fullWidth>
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
