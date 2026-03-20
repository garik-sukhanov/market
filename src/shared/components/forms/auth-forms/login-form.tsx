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
  gap: ${({ theme }) => theme.spacing[4]};
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
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="login-email">Email</Label>
            <Input
              {...field}
              id="login-email"
              $error={!!errors.username}
              $fullWidth
              placeholder="m@example.com"
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
          <InputWrapper>
            <Label htmlFor="login-password">Пароль</Label>
            <Input
              {...field}
              id="login-password"
              type="password"
              $error={!!errors.password}
              $fullWidth
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />
      <Button type="submit" $variant="primary" $size="large" $fullWidth>
        Войти
      </Button>
    </Form>
  );
};
