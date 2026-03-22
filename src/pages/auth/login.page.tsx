import styled from "styled-components";

import { LoginForm, type LoginFormValues } from "@/features/auth";
import { Card, Flex, Link } from "@/shared/components/ui";
import { useLoginMutation } from "@/shared/hooks";

function LoginPage() {
  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <AuthCard>
      <AuthCardInner>
        <Flex $vertical $gap={32} $align="center" $fullWidth>
          <Header>
            <LogoBubble aria-hidden="true">
              <LogoMark aria-hidden="true" />
            </LogoBubble>
            <Title>Добро пожаловать!</Title>
            <Subtitle>Пожалуйста, авторизируйтесь</Subtitle>
          </Header>

          <LoginForm onFinish={onSubmit} id="login-form" />

          <Footer>
            Нет аккаунта? <FooterLink to="#">Создать</FooterLink>
          </Footer>
        </Flex>
      </AuthCardInner>
    </AuthCard>
  );
}

export const Component = LoginPage;

const AuthCard = styled(Card)`
  width: min(527px, 100%);
  max-width: none;
  padding: 6px;
  gap: 32px;
  border: none;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 24px 28px rgba(0, 0, 0, 0.04);
`;

const AuthCardInner = styled.div`
  width: 100%;
  border-radius: 34px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: linear-gradient(
    180deg,
    rgba(35, 35, 35, 0.03) 0%,
    rgba(35, 35, 35, 0) 50%
  );
  border: 1px solid rgba(237, 237, 237, 0.7);

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const LogoBubble = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background:
    linear-gradient(0deg, rgba(35, 35, 35, 0) 50%, rgba(35, 35, 35, 0.06) 100%),
    #fff;
  border: 1px solid rgba(237, 237, 237, 0.7);
  box-shadow:
    0 12px 7px rgba(0, 0, 0, 0.03),
    0 0 0 2px #fff;
`;

function LogoMark() {
  const heights = [11, 12, 14, 15, 17, 19, 21, 23, 26, 29, 32];
  return (
    <svg
      width="35"
      height="34"
      viewBox="0 0 35 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {heights.map((height, index) => {
        const x = 4.1 + index * 2.37;
        const y = 34 - height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width="1.6"
            height={height}
            rx="0.8"
            fill="#000"
          />
        );
      })}
    </svg>
  );
}

const Title = styled.h1`
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.6px;
  color: #232323;
  text-align: center;
`;

const Subtitle = styled.p`
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: #e0e0e0;
  text-align: center;
`;

const Footer = styled.p`
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.grey5};
  text-align: center;
`;

const FooterLink = styled(Link)`
  color: inherit;
  font-weight: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;
  }
`;
