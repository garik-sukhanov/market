// import { createBrowserRouter, Navigate } from "react-router";

// import { RouteFallback } from "@/shared/components/RouteFallback";
// import { ROUTES } from "@/shared/model/routes";

// import App from "./App";
// import { protectedLoader } from "./protected-loader";
// import { ProtectedRoute } from "./protected-route";
// import { Providers } from "./providers";

// export const router = createBrowserRouter([
//   {
//     element: (
//       <Providers>
//         <App />
//       </Providers>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Navigate to={ROUTES.PRODUCTS_LIST} />,
//       },
//       // 🔒 Защищённые маршруты
//       {
//         loader: protectedLoader,
//         element: <ProtectedRoute />,
//         HydrateFallback: RouteFallback,
//         children: [
//           {
//             path: ROUTES.PRODUCTS_LIST,
//             lazy: () => import("@/features/products-list.page"),
//           },
//           {
//             path: ROUTES.LOGIN,
//             lazy: () => import("@/features/login.page"),
//           },
//         ],
//       },
//     ],
//   },
// ]);
