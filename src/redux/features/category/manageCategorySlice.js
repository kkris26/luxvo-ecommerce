import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../../../db/db";

const initialState = {
  openModal: false,
  categories: [],
  mode: null,
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
  },
});

export const {
  setNewCategory,
  setOpenModal,
  setCategories,
  setLoadingGetCategory,
} = manageCategorySlice.actions;
export const handleOnChange = (e) => (dispatch, getState) => {
  const { name, value } = e.target;
  const { newCategory } = getState().manageCategory;
  dispatch(setNewCategory({ ...newCategory, [name]: value }));
};
export const onSubmit = (data) => async (dispatch) => {
  try {
    await addDoc(collection(db, "categories"), data);
    dispatch(getAllCategories());
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
