import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./product/productSlice";
import { manageProductReducer } from "./product/manageProductSlice";
import { manageCategoryReducer } from "../features/category/manageCategorySlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    manageProduct: manageProductReducer,
    manageCategory: manageCategoryReducer,
  },
});
