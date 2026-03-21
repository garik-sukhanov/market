import { type ReactNode } from "react";
import { useIsFetching } from "@tanstack/react-query";
import styled from "styled-components";

import { LoadLine } from "../ui";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const isFetching = useIsFetching();

  return (
    <OutsideLayout>
      <LoadLine isLoading={!!isFetching} />
      <StyledContent>{children}</StyledContent>
    </OutsideLayout>
  );
};

const OutsideLayout = styled.div`
  min-height: 100dvh;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgBase};
`;

const StyledContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;
