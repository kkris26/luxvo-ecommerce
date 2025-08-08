import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../../db/db";
import { addToast } from "@heroui/react";

const initialState = {
  openModal: false,
  categories: [],
  mode: null,
  onEdit: false,
  category: null,
  categoryToDelete: null,
  selectedCategory: null,
  newCategory: null,
  loadingGetCategory: true,
};

const manageCategorySlice = createSlice({
  name: "manageCategorySlice",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setNewCategory: (state, action) => {
      state.newCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoadingGetCategory: (state, action) => {
      state.loadingGetCategory = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryToDelete: (state, action) => {
      state.categoryToDelete = action.payload;
    },
    setOnEdit: (state, action) => {
      state.onEdit = action.payload;
    },
  },
});

export const {
  setNewCategory,
  setOpenModal,
  setCategories,
  setLoadingGetCategory,
  setMode,
  setCategory,
  setCategoryToDelete,
  setOnEdit,
} = manageCategorySlice.actions;
export const handleOnChange = (e) => (dispatch, getState) => {
  const { name, value } = e.target;
  const { newCategory, mode, category, onEdit } = getState().manageCategory;
  if (!onEdit) {
    dispatch(setOnEdit(true));
  }
  if (mode === "add") {
    dispatch(setNewCategory({ ...newCategory, [name]: value }));
  } else {
    dispatch(setCategory({ ...category, [name]: value }));
  }
};
export const onSubmit = (data) => async (dispatch, getState) => {
  const { mode } = getState().manageCategory;
  try {
    if (mode === "add") {
      await addDoc(collection(db, "categories"), data);
      dispatch(setNewCategory(null));
    } else {
      const updateRef = doc(db, "categories", data.id);
      await updateDoc(updateRef, data);
      dispatch(setOpenModal(false));
    }
    dispatch(getAllCategories());
    dispatch(setOnEdit(false));
    addToast({
      title: "Success",
      description: `Category ${
        mode === "add" ? "added" : "update"
      } successfully.`,
      timeout: 3000,
      size: "sm",
      color: "success",
      radius: "sm",
      shouldShowTimeoutProgress: true,
    });
  } catch (error) {
    console.log(error);
  } finally {
    // dispatch(setOpenModal(false));
    // console.log("succes add ctagory");
  }
};

export const getAllCategories = () => async (dispatch) => {
  dispatch(setLoadingGetCategory(true));
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setCategories(categories));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoadingGetCategory(false));
  }
};

export const handleDeleteCategory =
  (categoryId) => async (dispatch, getState) => {
    const { products } = getState().products;
    const count = products.filter((p) => p.category === categoryId);
    if (count.length > 0) {
      addToast({
        title: "Cannot Delete",
        description: `This category is used by ${count.length} products.`,
        timeout: 3000,
        size: "sm",
        color: "danger",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
      return;
    }
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      dispatch(getAllCategories());
      addToast({
        title: "Deleted",
        description: "Category deleted successfully.",
        timeout: 3000,
        size: "sm",
        color: "success",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const confirmDelete = () => (dispatch) => {};
export const manageCategoryReducer = manageCategorySlice.reducer;
