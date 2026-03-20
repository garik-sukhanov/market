import { createElement } from "react";
import { createBrowserRouter, Outlet } from "react-router";

import { AppLayout, AuthLayout } from "@/shared/components";
import { RouteFallback } from "@/shared/components/route-fallback";
import { ROUTES } from "@/shared/model/routes";

import { protectedLoader } from "./protected-loader";
import { ProtectedRoute } from "./protected-route";

function AppLayoutRoute() {
  return createElement(AppLayout, { children: createElement(Outlet) });
}

export const router = createBrowserRouter([
  {
    HydrateFallback: RouteFallback,
    Component: AuthLayout,
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
