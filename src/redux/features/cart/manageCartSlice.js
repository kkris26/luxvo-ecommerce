import { createSlice } from "@reduxjs/toolkit";
import db from "../../../db/db";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { addToast } from "@heroui/react";

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
  dispatch(setLoadingCart(true));
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
  } finally {
    dispatch(setLoadingCart(false));
  }
};
export const handleCartUpdate =
  (userID, productID, action = "add") =>
  async (dispatch) => {
    dispatch(setLoadingCart(true));
    try {
      const docRef = doc(db, "users", userID, "carts", productID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const currentQty = data.quantity || 1;

        if (action === "add") {
          await setDoc(docRef, { quantity: currentQty + 1 });
        } else if (action === "remove") {
          if (currentQty > 1) {
            await setDoc(docRef, { quantity: currentQty - 1 });
          } else {
            await deleteDoc(docRef);
          }
        }
      } else {
        if (action === "add") {
          await setDoc(docRef, { quantity: 1 });
        }
      }

      dispatch(getUserCarts(userID));

      addToast({
        title: action === "add" ? "Added to Cart" : "Removed from Cart",
        description: `Product has been ${
          action === "add" ? "added to" : "removed from"
        } your cart.`,
        color: "success",
      });
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoadingCart(false));
    }
  };

export const manageCartReducer = manageCartSlice.reducer;
