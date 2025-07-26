import { addToast } from "@heroui/react";
import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getProducts } from "./productSlice";
import db from "../../../db/db";

const initialState = {
  openModal: false,
  isAddProduct: false,
  productToDelete: null,
  selectedProduct: null,
  loadingAddProduct: false,
};

const manageProductSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setIsAddProduct: (state, action) => {
      state.isAddProduct = action.payload;
    },
    setProductToDelete: (state, action) => {
      state.productToDelete = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoadingAddProduct: (state, action) => {
      state.loadingAddProduct = action.payload;
    },
  },
});

export const {
  setOpenModal,
  setIsAddProduct,
  setProductToDelete,
  setSelectedProduct,
  setLoadingAddProduct,
} = manageProductSlice.actions;

export const handleAddproduct = (data) => async (dispatch) => {
  dispatch(setLoadingAddProduct(true));
  try {
    console.log(data);
    const docRef = await addDoc(collection(db, "products"), data);

    addToast({
      title: "Product Added",
      description: "Add Product Successfully",
      timeout: 3000,
      size: "sm",
      color: "success",
      radius: "sm",
      shouldShowTimeoutProgress: true,
    });
    dispatch(getProducts());
  } catch (error) {
    console.log("error", error);
    addToast({
      title: "Error",
      description: "Something went wrong !",
      timeout: 3000,
      size: "sm",
      color: "danger",
      radius: "sm",
      shouldShowTimeoutProgress: true,
    });
  } finally {
    dispatch(setLoadingAddProduct(false));
  }
};

export const handleDeleteProduct = (productId) => async (dispatch) => {
  await deleteDoc(doc(db, "products", productId));
  dispatch(setProductToDelete(null));
  addToast({
    title: "Succesfully",
    description: "Delete Product Succesfully",
    timeout: 3000,
    size: "sm",
    color: "success",
    radius: "sm",
    shouldShowTimeoutProgress: true,
  });
  dispatch(getProducts());
};

export const confirmDelete = () => (dispatch) => {
  dispatch(setOpenModal(true));
};

export const manageProductReducer = manageProductSlice.reducer;
