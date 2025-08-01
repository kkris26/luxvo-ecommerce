import { createSlice } from "@reduxjs/toolkit";
import db from "../../../db/db";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  loadingCart: true,
  userCarts: [],
};

const manageCartSlice = createSlice({
  name: "manageCart",
  initialState,
  reducers: {
    setLoadingCart: (state, action) => {
      state.loadingCart = action.payload;
    },
    setUserCarts: (state, action) => {
      state.userCarts = action.payload;
    },
  },
});

export const { setLoadingCart, setUserCarts } = manageCartSlice.actions;

export const getUserCarts = (userID) => async (dispatch) => {
  // Query a reference to a subcollection
  const querySnapshot = await getDocs(collection(db, "users", userID, "carts"));
  const results = querySnapshot.docs.map((doc) => {
    doc.data();
  });
  console.log(results);
};

export const manageCartReducer = manageCartSlice.reducer;
