import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../../db/db";

const initialState = {
  openModal: false,
  categories: [],
  mode: null,
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
  },
});

export const {
  setNewCategory,
  setOpenModal,
  setCategories,
  setLoadingGetCategory,
  setMode,
  setCategory,
} = manageCategorySlice.actions;
export const handleOnChange = (e) => (dispatch, getState) => {
  const { name, value } = e.target;
  const { newCategory, mode, category } = getState().manageCategory;
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
    } else {
      const updateRef = doc(db, "categories", data.id);
      await updateDoc(updateRef, data);
    }
    dispatch(getAllCategories());
    addToast({
      title: "Success",
      description: `Product ${
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
    dispatch(setOpenModal(false));
    console.log("succes add ctagory");
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
export const manageCategoryReducer = manageCategorySlice.reducer;
