import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";

import { Fallback } from "@/shared/components/fallback";

import { Providers } from "./providers";
import { router } from "./router";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
