import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import type { OrderParamsType } from "@/shared/types/requests";

import { Checkbox, type CheckboxVariant } from "../checkbox";
import { Skeleton } from "../skeleton";
import { SortIcon } from "./sort-icon";

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

const Tr = styled.tr<{ $selected?: boolean }>`
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgBase};
  }
  &:last-child ${Td} {
    border-bottom: none;
  }
  ${({ $selected, theme }) =>
    $selected
      ? css`
          & > td:first-child {
            box-shadow: inset 3px 0 0 ${theme.colors.darkBlue};
          }
        `
      : null}
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
  checkboxVariant?: CheckboxVariant;
};

const SelectionTh = styled(Th)`
  width: 40px;
  padding-left: ${({ theme }) => theme.spacing[16]};
  padding-right: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const SelectionTd = styled(Td)`
  width: 40px;
  padding-left: ${({ theme }) => theme.spacing[16]};
  padding-right: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

interface Column<T> {
  title?: React.ReactNode | null;
  key: string;
  dataIndex?: keyof T | null;
  render?: (value: T[keyof T] | undefined, record: T) => React.ReactNode;
  order?: "desc" | "asc";
  skeleton?: React.ReactNode;
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
  const checkboxVariant: CheckboxVariant =
    rowSelection?.checkboxVariant ?? "filled";

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

  const isSortDisabledColumn = (col: Column<T>) =>
    col.dataIndex === null && col.title == null;

  const onHeaderClick = (col: Column<T>) => {
    if (!onClickHeader) return;
    if (isSortDisabledColumn(col)) return;

    if (onDoubleClickHeader) {
      if (clickTimeoutRef.current !== null) {
        window.clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = window.setTimeout(() => {
        onClickHeader(col.key);
        clickTimeoutRef.current = null;
      }, 200);
      return;
    }

    onClickHeader(col.key);
  };

  const onHeaderDoubleClick = (col: Column<T>) => {
    if (!onDoubleClickHeader) return;
    if (isSortDisabledColumn(col)) return;

    if (clickTimeoutRef.current !== null) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    onDoubleClickHeader(col.key);
  };

  if (loading) {
    return (
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {rowSelection ? (
                <SelectionTh $clickable={false}>
                  <Checkbox variant={checkboxVariant} disabled={true} />
                </SelectionTh>
              ) : null}
              {columns.map((col) =>
                (() => {
                  const sortDisabled = isSortDisabledColumn(col);
                  const active = !sortDisabled && activeSortKey === col.key;
                  const clickable =
                    !sortDisabled &&
                    Boolean(onClickHeader || onDoubleClickHeader);

                  return (
                    <Th
                      key={col.key}
                      $active={active}
                      $clickable={clickable}
                      onClick={() => onHeaderClick(col)}
                      onDoubleClick={() => onHeaderDoubleClick(col)}
                    >
                      <ThContent>
                        {active ? (
                          <SortIcon active={active} order={activeSortOrder} />
                        ) : null}
                        {col.title}
                      </ThContent>
                    </Th>
                  );
                })(),
              )}
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
                    {col.skeleton ?? <Skeleton $height="20px" $width="80%" />}
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
                  variant={checkboxVariant}
                  checked={headerChecked}
                  onChange={(e) =>
                    rowSelection.rowSelectionAll(e.target.checked, allRowKeys)
                  }
                />
              </SelectionTh>
            ) : null}
            {columns.map((col) =>
              (() => {
                const sortDisabled = isSortDisabledColumn(col);
                const active = !sortDisabled && activeSortKey === col.key;
                const clickable =
                  !sortDisabled &&
                  Boolean(onClickHeader || onDoubleClickHeader);

                return (
                  <Th
                    key={col.key}
                    $active={active}
                    $clickable={clickable}
                    onClick={() => onHeaderClick(col)}
                    onDoubleClick={() => onHeaderDoubleClick(col)}
                  >
                    <ThContent>
                      {active ? (
                        <SortIcon active={active} order={activeSortOrder} />
                      ) : null}
                      {col.title}
                    </ThContent>
                  </Th>
                );
              })(),
            )}
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((record) => (
            <Tr
              key={rowKey(record)}
              $selected={
                rowSelection ? selectedSet.has(rowKey(record)) : undefined
              }
            >
              {rowSelection ? (
                <SelectionTd>
                  <Checkbox
                    variant={checkboxVariant}
                    checked={selectedSet.has(rowKey(record))}
                    onChange={() => rowSelection.rowSelection(rowKey(record))}
                  />
                </SelectionTd>
              ) : null}
              {columns.map((col) => (
                <Td key={col.key}>
                  {col.render
                    ? col.render(
                        col.dataIndex != null
                          ? record[col.dataIndex]
                          : undefined,
                        record,
                      )
                    : col.dataIndex != null
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
