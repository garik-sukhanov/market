import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const LoginPage = lazy(() => import("./pages/login.page"));
const ProductsListPage = lazy(() => import("./pages/products-list.page"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProductsListPage,
    // loader: loadRootData,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
