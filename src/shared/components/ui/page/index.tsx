import type { ReactNode } from 'react';
import { styled } from 'styled-components';

export interface PageProps {
  children?: ReactNode;
  title?: string;
  slotHeaderRight?: ReactNode;
  slotPagination?: ReactNode;
}

export const Page = ({
  children,
  title,
  slotHeaderRight,
  slotPagination,
}: PageProps) => {
  return (
    <PageWrapper>
      <TopLine>
        <PageTitle>{title}</PageTitle>
        {slotHeaderRight}
      </TopLine>
      <Content>{children}</Content>
      {slotPagination && (
        <PaginationWrapper>{slotPagination}</PaginationWrapper>
      )}
    </PageWrapper>
  );
};

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const PageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textBase};
`;

const Content = styled.div`
  flex: 1;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
