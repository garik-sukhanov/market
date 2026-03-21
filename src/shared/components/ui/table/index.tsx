import { useEffect, useRef } from "react";
import styled from "styled-components";

import type { OrderParamsType } from "@/shared/types/requests";

import { Skeleton } from "../skeleton";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.bgContainer};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th<{ $active?: boolean; $clickable?: boolean }>`
  padding: ${({ theme }) => theme.spacing[12]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.bgContainer};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.grey3};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing[12]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey2};
  color: ${({ theme }) => theme.colors.textBase};
  background-color: transparent;
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgBase};
  }
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

const ThContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  user-select: none;
`;

type RowSelectionKey = string | number;

export type RowSelection = {
  selected: RowSelectionKey[];
  rowSelection: (key: RowSelectionKey) => void;
  rowSelectionAll: (checked: boolean, keys: RowSelectionKey[]) => void;
};

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const SelectionTh = styled(Th)`
  width: 40px;
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

const SelectionTd = styled(Td)`
  width: 40px;
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

interface Column<T> {
  title: string;
  key: string;
  dataIndex?: keyof T;
  render?: (value: T[keyof T] | undefined, record: T) => React.ReactNode;
  order?: "desc" | "asc";
}

interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[] | undefined;
  loading?: boolean;
  rowKey: (record: T) => string | number;
  rowSelection?: RowSelection;
  onClickHeader?: (key: string) => void;
  onDoubleClickHeader?: (key: string) => void;
  activeSortKey?: string;
  activeSortOrder?: OrderParamsType;
}

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

const Table = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  loading,
  rowKey,
  onClickHeader,
  onDoubleClickHeader,
  activeSortKey,
  activeSortOrder = "asc",
  rowSelection,
}: TableProps<T>) => {
  const clickTimeoutRef = useRef<number | null>(null);
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);

  const allRowKeys = (dataSource || []).map(rowKey);
  const selectedSet = new Set(rowSelection?.selected || []);
  const selectedInPageCount = allRowKeys.reduce<number>(
    (acc, key) => (selectedSet.has(key) ? acc + 1 : acc),
    0,
  );
  const headerChecked =
    allRowKeys.length > 0 && selectedInPageCount > 0
      ? selectedInPageCount === allRowKeys.length
      : false;
  const headerIndeterminate = selectedInPageCount > 0 && !headerChecked;

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate = headerIndeterminate;
  }, [headerIndeterminate]);

  const onHeaderClick = (key: string) => {
    if (!onClickHeader) return;

    if (onDoubleClickHeader) {
      if (clickTimeoutRef.current !== null) {
        window.clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = window.setTimeout(() => {
        onClickHeader(key);
        clickTimeoutRef.current = null;
      }, 200);
      return;
    }

    onClickHeader(key);
  };

  const onHeaderDoubleClick = (key: string) => {
    if (!onDoubleClickHeader) return;

    if (clickTimeoutRef.current !== null) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    onDoubleClickHeader(key);
  };

  if (loading) {
    return (
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {rowSelection ? (
                <SelectionTh $clickable={false}>
                  <Checkbox disabled={true} />
                </SelectionTh>
              ) : null}
              {columns.map((col) => (
                <Th
                  key={col.key}
                  $active={activeSortKey === col.key}
                  $clickable={Boolean(onClickHeader || onDoubleClickHeader)}
                  onClick={() => onHeaderClick(col.key)}
                  onDoubleClick={() => onHeaderDoubleClick(col.key)}
                >
                  <ThContent>
                    {activeSortKey === col.key ? (
                      <SortIcon
                        active={activeSortKey === col.key}
                        order={activeSortOrder}
                      />
                    ) : null}
                    {col.title}
                  </ThContent>
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Tr key={`skeleton-row-${rowIndex}`}>
                {rowSelection ? (
                  <SelectionTd key={`skeleton-cell-${rowIndex}-selection`}>
                    <Skeleton $height="16px" $width="16px" />
                  </SelectionTd>
                ) : null}
                {columns.map((col) => (
                  <Td key={`skeleton-cell-${rowIndex}-${col.key}`}>
                    <Skeleton $height="20px" $width="80%" />
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {rowSelection ? (
              <SelectionTh $clickable={false}>
                <Checkbox
                  ref={headerCheckboxRef}
                  checked={headerChecked}
                  onChange={(e) =>
                    rowSelection.rowSelectionAll(e.target.checked, allRowKeys)
                  }
                />
              </SelectionTh>
            ) : null}
            {columns.map((col) => (
              <Th
                key={col.key}
                $active={activeSortKey === col.key}
                $clickable={Boolean(onClickHeader || onDoubleClickHeader)}
                onClick={() => onHeaderClick(col.key)}
                onDoubleClick={() => onHeaderDoubleClick(col.key)}
              >
                <ThContent>
                  {activeSortKey === col.key ? (
                    <SortIcon
                      active={activeSortKey === col.key}
                      order={activeSortOrder}
                    />
                  ) : null}
                  {col.title}
                </ThContent>
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((record) => (
            <Tr key={rowKey(record)}>
              {rowSelection ? (
                <SelectionTd>
                  <Checkbox
                    checked={selectedSet.has(rowKey(record))}
                    onChange={() => rowSelection.rowSelection(rowKey(record))}
                  />
                </SelectionTd>
              ) : null}
              {columns.map((col) => (
                <Td key={col.key}>
                  {col.render
                    ? col.render(
                        col.dataIndex ? record[col.dataIndex] : undefined,
                        record,
                      )
                    : col.dataIndex
                      ? (record[col.dataIndex] as React.ReactNode)
                      : null}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export { Table };
