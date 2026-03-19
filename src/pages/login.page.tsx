export default function LoginPage() {
  return (
    <section id="center">
      <h1>Вход</h1>
      <form id="login-form">
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </section>
  );
}
