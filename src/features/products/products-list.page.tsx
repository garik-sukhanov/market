import { type ChangeEvent, useState } from "react";
import styled from "styled-components";

import { IconArrowsClockwise, IconPlusCircle } from "@/shared/assets";
import {
  Button,
  Flex,
  Pagination,
  ProductsTable,
  SearchInput,
  Typography,
} from "@/shared/components";
import { LogoutButton } from "@/shared/components";
import { useProductsSearchQuery } from "@/shared/hooks/products";
import type { OrderParamsType } from "@/shared/types/requests";

const LIMIT = 10;

function ProductsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [order, setOrder] = useState<OrderParamsType>("asc");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { data, isLoading, refetch } = useProductsSearchQuery(
    sortBy
      ? {
          limit: LIMIT,
          skip: (currentPage - 1) * LIMIT,
          q: searchQuery,
          sortBy,
          order,
        }
      : {
          limit: LIMIT,
          skip: (currentPage - 1) * LIMIT,
          q: searchQuery,
        },
  );

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
            rowSelection: (key) => {
              if (typeof key !== "number") return;
              setSelectedProductIds((prev) =>
                prev.includes(key)
                  ? prev.filter((id) => id !== key)
                  : [...prev, key],
              );
            },
            rowSelectionAll: (checked, keys) => {
              const pageIds = keys.filter((key) => typeof key === "number");
              setSelectedProductIds((prev) => {
                if (checked) {
                  const next = new Set(prev);
                  for (const id of pageIds) next.add(id);
                  return Array.from(next);
                }

                const pageIdSet = new Set(pageIds);
                return prev.filter((id) => !pageIdSet.has(id));
              });
            },
          }}
          onClickHeader={onClickTableHeader}
          onDoubleClickHeader={onDoubleClickTableHeader}
          activeSortKey={sortBy}
          activeSortOrder={order}
        />
        <Flex $fullWidth $justify="space-between" style={{ padding: "52px 0" }}>
          <Typography>
            {`Показано ${currentPage * LIMIT - LIMIT + 1}-${currentPage * LIMIT} из ${
              data?.total || 0
            }`}
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
