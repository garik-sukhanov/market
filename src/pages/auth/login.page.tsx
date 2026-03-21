import { LoginForm, type LoginFormValues } from "@/features/auth";
import {
  Card,
  CardTitle,
  Flex,
  Link,
  Typography,
} from "@/shared/components/ui";
import { useLoginMutation } from "@/shared/hooks";

function LoginPage() {
  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <Card>
      <Flex $align="top" $justify="space-between">
        <CardTitle>Вход в аккаунт</CardTitle>
      </Flex>

      <LoginForm onFinish={onSubmit} id="login-form" />
      <Typography $variant="body">
        Нет аккаунта? <Link to="#">зарегистрироваться</Link>
      </Typography>
    </Card>
  );
}

export const Component = LoginPage;
