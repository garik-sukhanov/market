import styled from "styled-components";

import { IconDetails, IconPlus } from "@/shared/assets";
import {
  Button,
  Flex,
  Skeleton,
  Table,
  Typography,
} from "@/shared/components/ui";
import type { RowSelection } from "@/shared/components/ui/table";
import { lightTokens } from "@/shared/tokens";
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

const PhotoSkeleton = styled(Skeleton)`
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  border-radius: ${({ theme }) => theme.spacing[4]};
`;

const TextLineSkeleton = styled(Skeleton)`
  height: 22px;
`;

const ActionButtonSkeleton = styled(Skeleton)`
  height: 30px;
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
          skeleton: (
            <Flex $gap={4}>
              <PhotoSkeleton />
              <Flex $vertical>
                <TextLineSkeleton $width="220px" />
                <TextLineSkeleton $width="140px" $height="20px" />
              </Flex>
            </Flex>
          ),
          render: (value, { images, category }) => (
            <Flex $gap={4}>
              <Photo src={images?.[0] || ""} alt={value as string} />
              <Flex $vertical>
                <Typography $weight="bold">{value as string}</Typography>
                <Typography $variant="body" $color={lightTokens.colors.grey3}>
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
          skeleton: <TextLineSkeleton $width="120px" />,
          render: (value) => (
            <Typography $weight="bold">{value as string}</Typography>
          ),
        },
        {
          title: "Артикул",
          dataIndex: "id",
          key: "id",
          skeleton: <TextLineSkeleton $width="80px" />,
          render: (value) => (
            <Typography $uppercase>{value as string}</Typography>
          ),
        },
        {
          title: "Оценка",
          dataIndex: "rating",
          key: "rating",
          skeleton: <TextLineSkeleton $width="52px" />,
          render: (value) => <Rating value={value as RatingValue} max={5} />,
        },
        {
          title: "Цена, ₽",
          dataIndex: "price",
          key: "price",
          skeleton: <TextLineSkeleton $width="84px" />,
          render: (value) => <Price value={value as PriceValue} />,
        },
        {
          title: null,
          dataIndex: null,
          key: "actions",
          skeleton: (
            <Flex>
              <ActionButtonSkeleton $width="44px" $borderRadius="23px" />
              <ActionButtonSkeleton $width="44px" $borderRadius="16px" />
            </Flex>
          ),
          render: () => (
            <Flex $align="center" $gap={32}>
              <Button $variant="round" $size="small" icon={<IconPlus />} />
              <Button $variant="ghost" $size="small" icon={<IconDetails />} />
            </Flex>
          ),
        },
      ]}
      dataSource={products}
      rowKey={(record) => record.id}
    />
  );
};
