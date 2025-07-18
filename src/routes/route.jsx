import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import HomePage from "../pages/HomePage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import AdminLayout from "../layouts/AdminLayout";
import ProductPage from "../pages/admin/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "terms-and-conditions", element: <TermsAndConditionsPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "product", element: <ProductPage /> },
    ],
  },
]);
