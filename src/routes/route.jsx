import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AdminLayout from "../layouts/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <div>Shop Page</div> },
      { path: "categories", element: <div>Categories Page</div> },
      { path: "about", element: <div>About Us Page</div> },
      { path: "contact", element: <div>Contact Page</div> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard Page</div> },
      { path: "products", element: <div>Products Page</div> },
      { path: "orders", element: <div>Orders Page</div> },
      { path: "customers", element: <div>Customers Page</div> },
      { path: "reports", element: <div>Reports Page</div> },
    ],
  },
]);
