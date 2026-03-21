import styled from "styled-components";

import { Flex } from "../flex";

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

  font-size: 14px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bgContainer};
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.grey2};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.grey3};
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}20;
  }
`;

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
  padding: 0 4px;
  user-select: none;
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
  const maxButtons = 5;

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxButtons) {
      return {
        pages: Array.from({ length: totalPages }, (_, i) => i + 1),
        showLeftEllipsis: false,
        showRightEllipsis: false,
      };
    }

    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, current - half);
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxButtons + 1;
    }

    return {
      pages: Array.from({ length: end - start + 1 }, (_, i) => start + i),
      showLeftEllipsis: start > 1,
      showRightEllipsis: end < totalPages,
    };
  };

  const { pages, showLeftEllipsis, showRightEllipsis } = getVisiblePages();

  return (
    <Flex $gap={10} $align="center">
      <Button
        disabled={current === 1}
        onClick={() => onChange(current - 1, pageSize)}
      >
        {"<"}
      </Button>

      {showLeftEllipsis && <Ellipsis>...</Ellipsis>}
      {pages.map((page) => (
        <Button
          key={page}
          $active={current === page}
          onClick={() => onChange(page, pageSize)}
        >
          {page}
        </Button>
      ))}
      {showRightEllipsis && <Ellipsis>...</Ellipsis>}

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
