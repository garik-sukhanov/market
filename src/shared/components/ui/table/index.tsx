import styled from "styled-components";

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

const Th = styled.th`
  padding: ${({ theme }) => theme.spacing[12]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.bgContainer};
  color: ${({ theme }) => theme.colors.grey3};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing[12]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey2};
  color: ${({ theme }) => theme.colors.textBase};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgBase};
  }
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

interface Column<T> {
  title: string;
  key: string;
  dataIndex?: keyof T;
  render?: (value: T[keyof T] | undefined, record: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[] | undefined;
  loading?: boolean;
  rowKey: (record: T) => string | number;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  loading,
  rowKey,
}: TableProps<T>) => {
  if (loading) {
    return (
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.title}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Tr key={`skeleton-row-${rowIndex}`}>
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
            {columns.map((col) => (
              <Th key={col.key}>{col.title}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((record) => (
            <Tr key={rowKey(record)}>
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
