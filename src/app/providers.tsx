import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { lightTokens } from "@/shared/tokens";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTokens}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
