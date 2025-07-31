import { useDispatch, useSelector } from "react-redux";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { getProducts } from "../redux/store/product/productSlice";
import { getAllCategories } from "../redux/features/category/manageCategorySlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <NavbarHeader />
      <div className="px-4 max-w-7xl  mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
