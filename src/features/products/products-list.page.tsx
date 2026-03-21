import { type ChangeEvent, useState } from "react";
import styled from "styled-components";

import { IconArrowsClockwise, IconPlusCircle } from "@/shared/assets";
import {
  Button,
  Flex,
  Pagination,
  SearchInput,
  Table,
  Typography,
} from "@/shared/components";
import { LogoutButton } from "@/shared/components";
import { useProductsSearchQuery } from "@/shared/hooks/products";
import type { OrderParamsType } from "@/shared/types/requests";

const LIMIT = 10;

type RatingValue = number | { rate: number; count?: number } | null | undefined;

const getNumericRating = (value: RatingValue) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (value && typeof value === "object" && "rate" in value) {
    const rate = value.rate;
    return Number.isFinite(rate) ? rate : null;
  }
  return null;
};

const formatRating = (value: number) => {
  const formatted = value.toFixed(1);
  return formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
};

const RatingText = styled.span<{ $danger: boolean }>`
  font-weight: 600;
  color: ${({ theme, $danger }) =>
    $danger ? "#cf1322" : theme.colors.textBase};
`;

const Rating = ({ value, max }: { value: RatingValue; max: number }) => {
  const numeric = getNumericRating(value);
  if (numeric === null) return <span>—</span>;

  return (
    <RatingText $danger={numeric < 3}>
      {formatRating(numeric)}/{max}
    </RatingText>
  );
};

type PriceValue = number | string | null | undefined;

const PriceText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-variant-numeric: tabular-nums;
`;

const PriceMain = styled.span`
  color: ${({ theme }) => theme.colors.textBase};
`;

const PriceFraction = styled.span`
  color: ${({ theme }) => theme.colors.grey5};
`;

const Price = ({ value }: { value: PriceValue }) => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return <span>—</span>;

  const [main, frac] = numeric.toFixed(2).split(".");

  return (
    <PriceText>
      <PriceMain>{main}</PriceMain>
      <PriceFraction>.{frac}</PriceFraction>
    </PriceText>
  );
};

function ProductsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [order, setOrder] = useState<OrderParamsType>("asc");
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
        <Table
          loading={isLoading}
          onClickHeader={onClickTableHeader}
          onDoubleClickHeader={onDoubleClickTableHeader}
          activeSortKey={sortBy}
          activeSortOrder={order}
          columns={[
            {
              title: "Наименование",
              dataIndex: "title",
              key: "title",
              render: (value, { images, category }) => (
                <Flex>
                  <Photo src={images?.[0] || ""} alt={value as string} />
                  <Flex $vertical>
                    <Typography $weight="bold">{value as string}</Typography>
                    <Typography $variant="body">
                      {category as string}
                    </Typography>
                  </Flex>
                </Flex>
              ),
            },
            {
              title: "Вендор",
              dataIndex: "brand",
              key: "brand",
            },
            {
              title: "Артикул",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Оценка",
              dataIndex: "rating",
              key: "rating",
              render: (value) => (
                <Rating value={value as RatingValue} max={5} />
              ),
            },
            {
              title: "Цена",
              dataIndex: "price",
              key: "price",
              render: (value) => <Price value={value as PriceValue} />,
            },
          ]}
          dataSource={products}
          rowKey={(record) => record.id}
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

const Photo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.grey2};
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
