import { createBrowserRouter } from "react-router";

import { RouteFallback } from "@/shared/components/route-fallback";
import { ROUTES } from "@/shared/model/routes";

import { protectedLoader } from "./protected-loader";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    HydrateFallback: RouteFallback,
    path: ROUTES.LOGIN,
    lazy: async () => import("@/features/login.page"),
  },
  {
    path: ROUTES.PRODUCTS_LIST,
    loader: protectedLoader,
    Component: ProtectedRoute,
    HydrateFallback: RouteFallback,
    children: [
      {
        index: true,
        lazy: async () => import("@/features/products-list.page"),
      },
    ],
  },
]);
