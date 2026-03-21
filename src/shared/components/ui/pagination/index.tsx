import styled from "styled-components";

import { Flex } from "../flex";
import { Typography } from "../typography";

const Button = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  width: auto;
  height: 30px;
  min-width: 30px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bgContainer};
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.grey2};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.primary};
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}10;
  }
`;

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

const Pagination = ({
  current,
  pageSize,
  total,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <Flex $gap={10} $align="center">
      <Button
        disabled={current === 1}
        onClick={() => onChange(current - 1, pageSize)}
      >
        {"<"}
      </Button>

      {Array.from({ length: totalPages }).map((_, page) => (
        <Button
          key={page}
          $active={current === page + 1}
          onClick={() => onChange(page + 1, pageSize)}
        >
          {page + 1}
        </Button>
      ))}
      <Typography>
        Страница {current} из {totalPages}
      </Typography>

      <Button
        disabled={current === totalPages}
        onClick={() => onChange(current + 1, pageSize)}
      >
        {">"}
      </Button>
    </Flex>
  );
};

export { Pagination };
