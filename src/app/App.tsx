import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";

import { Fallback } from "@/shared/components/fallback";

import { Providers } from "./providers";
import { router } from "./router";

function App() {
  return (
    <Providers>
      <ErrorBoundary FallbackComponent={Fallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
