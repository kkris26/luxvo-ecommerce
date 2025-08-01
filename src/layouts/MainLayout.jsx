import { useDispatch, useSelector } from "react-redux";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { getProducts } from "../redux/features/product/productSlice";
import { getAllCategories } from "../redux/features/category/manageCategorySlice";
import MainFooter from "../components/Footer/MainFooter";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import MainBreadcrumbs from "../components/Breadcrumbs/MainBreadcrumbs";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
  }, []);

  const location = useLocation();

  return (
    <>
      <NavbarHeader />
      <div className="px-4 max-w-7xl  mx-auto">
        {location.pathname !== "/" && (
          <div className="py-4">
            <MainBreadcrumbs pathname={location.pathname} />
          </div>
        )}
        <Outlet />
      </div>
      <MainFooter />
    </>
  );
};

export default MainLayout;
