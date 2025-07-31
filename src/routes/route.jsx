import { createBrowserRouter, Outlet } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import CartPage from "../pages/user/CartPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProductsPage from "../pages/admin/ProductsPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import ProductCategory from "../pages/ProductCategory";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <div>Shop Page</div> },
      {
        path: "categories",
        element: <Outlet />,
        children: [{ path: ":category", element: <ProductCategory /> }],
      },
      {
        path: "product",
        // element: <Outlet />,
        children: [{ path: ":product", element: <ProductDetails /> }],
      },
      { path: "about", element: <div>About Us Page</div> },
      { path: "contact", element: <div>Contact Page</div> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard Page</div> },
      { path: "products", element: <ProductsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "orders", element: <div>Orders Page</div> },
      { path: "customers", element: <div>Customers Page</div> },
      { path: "reports", element: <div>Reports Page</div> },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { index: true, element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "favorite", element: <div>Favorite Page</div> },
      { path: "contact", element: <div>Contact Page</div> },
    ],
  },
]);
