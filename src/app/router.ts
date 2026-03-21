import { createBrowserRouter } from "react-router";

import { AppLayoutRoute } from "@/app/layouts/app-layout-route";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { RouteErrorBoundary } from "@/app/ui/route-error-boundary";
import { RouteFallback } from "@/app/ui/route-fallback";
import { ROUTES } from "@/shared/model/routes";

import { protectedLoader } from "./protected-loader";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    HydrateFallback: RouteFallback,
    Component: AuthLayout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: async () => import("@/pages/auth/login.page"),
      },
    ],
  },
  {
    path: ROUTES.PRODUCTS_LIST,
    loader: protectedLoader,
    Component: ProtectedRoute,
    HydrateFallback: RouteFallback,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        Component: AppLayoutRoute,
        children: [
          {
            index: true,
            lazy: async () => import("@/pages/products/products-list.page"),
          },
        ],
      },
    ],
  },
]);
