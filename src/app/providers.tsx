import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { queryClient } from "@/shared/api/query-client";
import { lightTokens } from "@/shared/tokens";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTokens}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
