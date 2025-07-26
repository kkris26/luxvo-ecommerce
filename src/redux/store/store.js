import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./product/productSlice";
import { manageProductReducer } from "./product/manageProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    manageProduct: manageProductReducer,
  },
});
