import styled from "styled-components";

import { Flex, Table, Typography } from "@/shared/components";
import type { RowSelection } from "@/shared/components/ui/table";
import type { ProductType } from "@/shared/types";
import type { OrderParamsType } from "@/shared/types/requests";

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
  font-size: 16px;
  line-height: 1.4;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error : theme.colors.textBase};
`;

const Rating = ({ value, max }: { value: RatingValue; max: number }) => {
  const numeric = getNumericRating(value);
  if (numeric === null) return <span>—</span>;

  return (
    <>
      <RatingText $danger={numeric < 3}>{formatRating(numeric)}</RatingText>/
      <RatingText $danger={false}>{max}</RatingText>
    </>
  );
};

type PriceValue = number | string | null | undefined;

const PriceText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 16px;
  line-height: 1.4;
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

const Photo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.grey2};
`;

export type ProductsTableProps = {
  products: ProductType[] | undefined;
  loading?: boolean;
  rowSelection?: RowSelection;
  onClickHeader?: (key: string) => void;
  onDoubleClickHeader?: (key: string) => void;
  activeSortKey?: string;
  activeSortOrder?: OrderParamsType;
};

export const ProductsTable = ({
  products,
  loading,
  rowSelection,
  onClickHeader,
  onDoubleClickHeader,
  activeSortKey,
  activeSortOrder,
}: ProductsTableProps) => {
  return (
    <Table<ProductType>
      loading={loading}
      rowSelection={rowSelection}
      onClickHeader={onClickHeader}
      onDoubleClickHeader={onDoubleClickHeader}
      activeSortKey={activeSortKey}
      activeSortOrder={activeSortOrder}
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
                <Typography $variant="body">{category as string}</Typography>
              </Flex>
            </Flex>
          ),
        },
        {
          title: "Вендор",
          dataIndex: "brand",
          key: "brand",
          render: (value) => (
            <Typography $weight={"bold"}>{value as string}</Typography>
          ),
        },
        {
          title: "Артикул",
          dataIndex: "id",
          key: "id",
          render: (value) => (
            <Typography $uppercase>{value as string}</Typography>
          ),
        },
        {
          title: "Оценка",
          dataIndex: "rating",
          key: "rating",
          render: (value) => <Rating value={value as RatingValue} max={5} />,
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
  );
};
