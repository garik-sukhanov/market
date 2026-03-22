import styled from "styled-components";

import type { OrderParamsType } from "@/shared/types/requests";

const SortIconWrapper = styled.span<{
  $active: boolean;
  $order: OrderParamsType;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  --sort-color-inactive: ${({ theme }) => theme.colors.grey3};
  --sort-color-active: ${({ theme }) => theme.colors.primary};
  --sort-up: ${({ $active, $order }) =>
    $active && $order === "asc"
      ? "var(--sort-color-active)"
      : "var(--sort-color-inactive)"};
  --sort-down: ${({ $active, $order }) =>
    $active && $order === "desc"
      ? "var(--sort-color-active)"
      : "var(--sort-color-inactive)"};
`;

const SortIcon = ({
  active,
  order,
}: {
  active: boolean;
  order: OrderParamsType;
}) => (
  <SortIconWrapper $active={active} $order={order}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 2v4M7 2L5 4M7 2l2 2"
        stroke="var(--sort-up)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12V8M7 12l-2-2M7 12l2-2"
        stroke="var(--sort-down)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SortIconWrapper>
);

export { SortIcon };
