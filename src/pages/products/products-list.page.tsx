import { type ChangeEvent, useState } from "react";
import styled from "styled-components";

import { LogoutButton } from "@/features/auth";
import { ProductsTable } from "@/features/products";
import { IconArrowsClockwise, IconPlusCircle } from "@/shared/assets";
import {
  Button,
  Flex,
  Pagination,
  SearchInput,
  Typography,
} from "@/shared/components/ui";
import { useDebounce } from "@/shared/hooks";
import { useProductsSearchQuery } from "@/shared/hooks/products";
import { lightTokens } from "@/shared/tokens";
import type { OrderParamsType } from "@/shared/types/requests";

const LIMIT = 10;

function ProductsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [order, setOrder] = useState<OrderParamsType>("asc");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const { data, isLoading, refetch } = useProductsSearchQuery(
    sortBy
      ? {
          limit: LIMIT,
          skip: (currentPage - 1) * LIMIT,
          q: debouncedSearchQuery,
          sortBy,
          order,
        }
      : {
          limit: LIMIT,
          skip: (currentPage - 1) * LIMIT,
          q: debouncedSearchQuery,
        },
  );

  const onRowSelection = (key: string | number) => {
    const formattedKey = Number(key);
    setSelectedProductIds((prev) =>
      prev.includes(formattedKey)
        ? prev.filter((id) => id !== formattedKey)
        : [...prev, formattedKey],
    );
  };

  const onRowSelectionAll = (checked: boolean, keys: (number | string)[]) => {
    const pageIds = keys.filter((key) => typeof key === "number");
    setSelectedProductIds((prev) => {
      if (checked) {
        const next = new Set(prev);
        for (const id of pageIds) next.add(id);
        return Array.from(next);
      }
      return prev.filter((id) => !pageIds.includes(id));
    });
  };

  const onChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const onClickTableHeader = (key: string) => {
    setCurrentPage(1);
    if (sortBy === key) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(key);
    setOrder("asc");
  };

  const onDoubleClickTableHeader = (key: string) => {
    if (sortBy !== key) return;
    setCurrentPage(1);
    setSortBy(undefined);
    setOrder("asc");
  };

  const { products } = data || {};

  return (
    <Section id="center">
      <StyledHederWrapper>
        <Typography $variant="h1">Товары</Typography>
        <SearchInput
          type="text"
          placeholder="Введите поисковый запрос"
          value={searchQuery}
          onChange={onChangeSearchQuery}
        />
        <LogoutButton />
      </StyledHederWrapper>
      <StyledTableWrapper>
        <Flex $fullWidth $justify="space-between">
          <Typography $variant="h2">Все позиции</Typography>
          <Flex $gap={8}>
            <Button
              $variant="secondary"
              icon={<IconArrowsClockwise aria-hidden="true" />}
              aria-label="Обновить"
              onClick={() => refetch()}
            />
            <Button icon={<IconPlusCircle aria-hidden="true" />}>
              Добавить
            </Button>
          </Flex>
        </Flex>
        <ProductsTable
          products={products}
          loading={isLoading}
          rowSelection={{
            selected: selectedProductIds,
            rowSelection: onRowSelection,
            rowSelectionAll: onRowSelectionAll,
          }}
          onClickHeader={onClickTableHeader}
          onDoubleClickHeader={onDoubleClickTableHeader}
          activeSortKey={sortBy}
          activeSortOrder={order}
        />
        <Flex $fullWidth $justify="space-between" style={{ padding: "52px 0" }}>
          <Typography>
            <Typography $color={lightTokens.colors.grey3}>Показано</Typography>{" "}
            {currentPage * LIMIT - LIMIT + 1}-{currentPage * LIMIT}{" "}
            <Typography $color={lightTokens.colors.grey3}>из</Typography>{" "}
            {data?.total || 0}
          </Typography>
          <Pagination
            current={currentPage}
            pageSize={LIMIT}
            total={data?.total || 0}
            onChange={(page) => setCurrentPage(page)}
          />
        </Flex>
      </StyledTableWrapper>
    </Section>
  );
}

const StyledHederWrapper = styled(Flex)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgContainer};
  padding: ${({ theme }) => theme.spacing[24]};
  gap: ${({ theme }) => theme.spacing[24]};
`;

const StyledTableWrapper = styled.div`
  padding: 30px 24px;
  background-color: ${({ theme }) => theme.colors.bgContainer};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[40]};
`;

const Section = styled.section`
  padding: 24px 0 0 0;
  background-color: ${({ theme }) => theme.colors.bgBase};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[24]};
`;

export const Component = ProductsListPage;
