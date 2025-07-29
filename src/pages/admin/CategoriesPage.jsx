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
import { getProducts } from "../../redux/store/product/productSlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (!categories.length ) {
      dispatch(getAllCategories());
    }
    if (!products.length) {
      dispatch(getProducts());
    }
  }, []);

  console.log(!categories.length);

  return (
    <>
      <CategoryTable />
      <Button onPress={() => dispatch(setOpenModal(true))} color="primary">
        Open Modal
      </Button>
      <ModalHandleCategory>
        <HandleCategory />
      </ModalHandleCategory>
    </>
  );
};

export default CategoriesPage;
