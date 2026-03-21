import { type FallbackProps } from "react-error-boundary";
import styled from "styled-components";

import { Button, Card, CardTitle, Flex, Tag, Typography } from "@/shared/components/ui";

function getErrorDetails(error: unknown) {
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

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const details = getErrorDetails(error);

  return (
    <Wrapper role="alert">
      <Card>
        <Flex $align="center" $justify="space-between">
          <Tag $color="error">Ошибка</Tag>
        </Flex>

        <div>
          <CardTitle>Что-то пошло не так</CardTitle>
          <MutedText>
            Попробуйте перезагрузить страницу. Если проблема повторяется —
            отправьте нам текст ошибки из раздела «Технические детали».
          </MutedText>
        </div>

        <Flex $gap={12} $align="center" style={{ flexWrap: "wrap" }}>
          <Button $variant="primary" onClick={() => window.location.reload()}>
            Перезагрузить
          </Button>
          <Button $variant="secondary" onClick={resetErrorBoundary}>
            Повторить
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
