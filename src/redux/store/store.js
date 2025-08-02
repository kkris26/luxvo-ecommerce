import { configureStore } from "@reduxjs/toolkit";

import { manageCategoryReducer } from "../features/category/manageCategorySlice";
import { productsReducer } from "../features/product/productSlice";
import { manageProductReducer } from "../features/product/manageProductSlice";
import { manageCartReducer } from "../features/cart/manageCartSlice";
import { favoriteReducer } from "../features/favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    manageProduct: manageProductReducer,
    manageCategory: manageCategoryReducer,
    manageCart: manageCartReducer,
    favorite: favoriteReducer,
  },
});
