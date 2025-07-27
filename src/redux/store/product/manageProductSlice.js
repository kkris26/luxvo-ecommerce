import { addToast } from "@heroui/react";
import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getProducts } from "./productSlice";
import db from "../../../db/db";

const initialState = {
  openModal: false,
  mode: null,
  productToDelete: null,
  selectedProduct: null,
  loadingHandleProduct: false,
  onEdit: false,
  safeToClose: true,
};

const manageProductSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setProductToDelete: (state, action) => {
      state.productToDelete = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoadingHandleProduct: (state, action) => {
      state.loadingHandleProduct = action.payload;
    },
    setOnEdit: (state, action) => {
      state.onEdit = action.payload;
    },
    setSafeToClose: (state, action) => {
      state.safeToClose = action.payload;
    },
  },
});

export const {
  setOpenModal,
  setMode,
  setProductToDelete,
  setSelectedProduct,
  setLoadingHandleProduct,
  setOnEdit,
  setSafeToClose,
} = manageProductSlice.actions;

export const handleAddproduct = (data) => async (dispatch) => {
  dispatch(setLoadingHandleProduct(true));
  try {
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
    // dispatch(setSelectedProduct(null));
    dispatch(setOnEdit(false));
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
    dispatch(setLoadingHandleProduct(false));
  }
};

export const handleOnChange = (e) => (dispatch, getState) => {
  const { name, value } = e.target;
  const { onEdit, selectedProduct } = getState().manageProduct;
  dispatch(setSelectedProduct({ ...selectedProduct, [name]: value }));
  if (!onEdit) {
    dispatch(setOnEdit(true));
  }
};

export const handleEditProduct = (data, productId) => async (dispatch) => {
  dispatch(setLoadingHandleProduct(true));
  try {
    const updateProductRef = doc(db, "products", productId);
    await updateDoc(updateProductRef, data);
    addToast({
      title: "Product Updated",
      description: "Update Product Successfully",
      timeout: 3000,
      size: "sm",
      color: "success",
      radius: "sm",
      shouldShowTimeoutProgress: true,
    });
    dispatch(setOnEdit(false));
    dispatch(getProducts());
    dispatch(setOpenModal(false));
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
    dispatch(setLoadingHandleProduct(false));
  }
};

export const handleDeleteProduct = (productId) => async (dispatch) => {
  await deleteDoc(doc(db, "products", productId));
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

export const handleCloseModal = () => (dispatch) => {
  dispatch(setOpenModal(false));
  dispatch(setOnEdit(false));
  setTimeout(() => {
    dispatch(setSafeToClose(true));
  }, 300);
};

export const manageProductReducer = manageProductSlice.reducer;
