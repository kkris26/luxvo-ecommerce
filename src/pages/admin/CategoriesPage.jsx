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

const CategoriesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  return (
    <>
      <h1 className="text-2xl mb-8">All Categories</h1>
      <div>
        {!loadingGetCategory ? (
          categories.map((c) => <p>{c.name}</p>)
        ) : (
          <p>Loading ...</p>
        )}
      </div>
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
