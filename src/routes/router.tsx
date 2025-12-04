import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/home/DashboardPage";
import ProductPage from "@/pages/product/ProductPage";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
