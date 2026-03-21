import { createBrowserRouter } from "react-router";

import {
  AppLayoutRoute,
  AuthLayout,
  RouteErrorBoundary,
} from "@/shared/components";
import { RouteFallback } from "@/shared/components/route-fallback";
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
        lazy: async () => import("@/features/auth/login.page"),
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
            lazy: async () => import("@/features/products/products-list.page"),
          },
        ],
      },
    ],
  },
]);
