import styled from "styled-components";

import { Spin } from "@/shared/components/ui";

export const RouteFallback = () => (
  <StyledRouteFallback>
    <Spin size="large" />
  </StyledRouteFallback>
);

const StyledRouteFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
