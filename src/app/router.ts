import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const LoginPage = lazy(() => import("@/features/login.page"));
const ProductsListPage = lazy(() => import("@/features/products-list.page"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProductsListPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
