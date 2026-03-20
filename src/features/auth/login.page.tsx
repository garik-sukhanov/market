import { Input } from "@/shared/components/ui/input";

function LoginPage() {
  return (
    <section id="center">
      <h1>Вход</h1>
      <form id="login-form">
        <Input type="text" placeholder="Логин" />
        <Input type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </section>
  );
}

export const Component = LoginPage;
