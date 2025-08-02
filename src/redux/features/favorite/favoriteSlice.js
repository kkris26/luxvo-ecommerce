import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import db from "../../../db/db";

const initialState = {
  favorites: [],
  loadingFavorite: false,
  favoriteProduct: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, actions) => {
      state.favorites = actions.payload;
    },
    setLoadingFavorite: (state, actions) => {
      state.loadingFavorite = actions.payload;
    },
    setFavoriteProduct: (state, actions) => {
      state.favoriteProduct = actions.payload;
    },
  },
});

export const { setFavoriteProduct, setFavorites, setLoadingFavorite } =
  favoriteSlice.actions;

export const getFavorites = (userID) => async (dispatch) => {
  const querySnapshot = await getDocs(
    collection(db, "users", userID, "favorites")
  );
  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  dispatch(setFavorites(results));
};

export const handleFavorite =
  (productID, userID) => async (dispatch, getState) => {
    dispatch(setFavoriteProduct({ productID, userID }));
    dispatch(setLoadingFavorite(true));
    const { favorites } = getState().favorite;
    try {
      const docRef = doc(db, "users", userID, "favorites", productID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newFavorites = favorites.filter((f) => f.productID !== productID);
        dispatch(setFavorites(newFavorites));
        await deleteDoc(docRef);
      } else {
        dispatch(setFavorites([...favorites, { productID }]));
        await setDoc(docRef, { productID });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingFavorite(false));
    }
  };

export const favoriteReducer = favoriteSlice.reducer;
