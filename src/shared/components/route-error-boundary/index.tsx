import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import styled from "styled-components";

import { ROUTES } from "@/shared/model/routes";

import { Button, Card, CardTitle, Flex, Tag, Typography } from "../ui";

function getRouteErrorDetails(error: unknown) {
  if (error instanceof Error) {
    const parts = [error.name, error.message, error.stack]
      .filter(Boolean)
      .join("\n");
    return parts || "Unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    const details =
      typeof error.data === "string"
        ? error.data
        : error.data
          ? JSON.stringify(error.data, null, 2)
          : undefined;

    return (
      <Wrapper role="alert">
        <Card>
          <Flex $align="center" $justify="space-between">
            <Tag $color="error">Ошибка</Tag>
          </Flex>

          <div>
            <CardTitle>Ошибка {error.status}</CardTitle>
            <MutedText>{error.statusText}</MutedText>
          </div>

          <Flex $gap={12} $align="center" style={{ flexWrap: "wrap" }}>
            <Button
              $variant="primary"
              onClick={() => navigate(ROUTES.PRODUCTS_LIST, { replace: true })}
            >
              На главную
            </Button>
            <Button $variant="secondary" onClick={() => navigate(-1)}>
              Назад
            </Button>
            <Button
              $variant="secondary"
              onClick={() => window.location.reload()}
            >
              Перезагрузить
            </Button>
          </Flex>

          {details && (
            <Details>
              <summary>Технические детали</summary>
              <pre>{details}</pre>
            </Details>
          )}
        </Card>
      </Wrapper>
    );
  }

  const details = getRouteErrorDetails(error);

  return (
    <Wrapper role="alert">
      <Card>
        <Flex $align="center" $justify="space-between">
          <Tag $color="error">Ошибка</Tag>
        </Flex>

        <div>
          <CardTitle>Что-то пошло не так</CardTitle>
          <MutedText>
            Попробуйте перейти назад или перезагрузить страницу.
          </MutedText>
        </div>

        <Flex $gap={12} $align="center" style={{ flexWrap: "wrap" }}>
          <Button
            $variant="primary"
            onClick={() => navigate(ROUTES.PRODUCTS_LIST, { replace: true })}
          >
            На главную
          </Button>
          <Button $variant="secondary" onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Button $variant="secondary" onClick={() => window.location.reload()}>
            Перезагрузить
          </Button>
        </Flex>

        <Details>
          <summary>Технические детали</summary>
          <pre>{details}</pre>
        </Details>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[24]};
  background-color: ${({ theme }) => theme.colors.bgBase};
`;

const MutedText = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey5};
`;

const Details = styled.details`
  overflow: hidden;

  summary {
    cursor: pointer;
    user-select: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }

  pre {
    margin: 0;
    padding: ${({ theme }) => theme.spacing[12]};
    background-color: ${({ theme }) => theme.colors.bgBase};
    border-radius: ${({ theme }) => theme.spacing[3]};
    border: 1px solid ${({ theme }) => theme.colors.grey2};
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 12px;
    line-height: 1.4;
  }
`;
