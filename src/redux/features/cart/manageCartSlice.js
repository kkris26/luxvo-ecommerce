import { createSlice } from "@reduxjs/toolkit";
import db from "../../../db/db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", userID, "carts")
    );
    const cartItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const productPromises = cartItems.map((item) =>
      getDoc(doc(db, "products", item.id))
    );

    const productSnapshots = await Promise.all(productPromises);

    const productsInCart = productSnapshots.map((p, i) => ({
      id: p.id,
      quantity: cartItems[i].quantity,
      ...p.data(),
    }));
    dispatch(setUserCarts(productsInCart));
  } catch (error) {
    console.log(error);
  }
};

export const manageCartReducer = manageCartSlice.reducer;
