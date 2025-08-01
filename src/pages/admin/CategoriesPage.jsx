import React, { useEffect } from "react";
import ModalProductDash from "../../components/Modal/ModalProductDash";
import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import HandleCategory from "./Modal/Category/HandleCategory";
import ModalHandleCategory from "./Modal/Category/ModalHandleCategory";
import {
  getAllCategories,
  setOpenModal,
} from "../../redux/features/category/manageCategorySlice";
import CategoryTable from "./Modal/Category/CategoryTable";
import { getProducts } from "../../redux/features/product/productSlice";
import ViewCategory from "./Modal/Category/ViewCategory";
import { ModalWarning } from "./Modal/Category/ModalWarning";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, onEdit, loadingGetCategory, mode, categoryToDelete } =
    useSelector((state) => state.manageCategory);
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }
    if (!products.length) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <>
      <CategoryTable />
      <ModalHandleCategory>
        {
          <>
            {(mode === "delete" || mode === "warning") && <ModalWarning />}
            {mode === "view" && <ViewCategory />}
            {(mode === "add" || mode === "edit") && <HandleCategory />}
          </>
        }
      </ModalHandleCategory>
    </>
  );
};

export default CategoriesPage;
