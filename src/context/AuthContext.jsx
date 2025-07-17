import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../configs/auth";
import { addToast } from "@heroui/react";
import db from "../db/db";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loadUserLogin, setLoadUserLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
        setLoadUserLogin(false);
        handleGetProfileUSer(user.uid);
      } else {
        setLoadUserLogin(false);
      }
      return () => unsubscribe();
    });
  }, []);

  const handleGetProfileUSer = async (userId) => {
    const profileSnap = await getDoc(
      doc(db, "users", userId, "profile", "main")
    );
    setUserLogin((prev) => ({ ...prev, profile: profileSnap.data() }));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserLogin(null);
        addToast({
          title: "Logout",
          description: "Log Out Successfully",
          timeout: 3000,
          size: "sm",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = async (email, password) => {
    try {
      const userSignUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        const docRef = await setDoc(
          doc(db, "users", userSignUp.user.uid, "profile", "main"),
          {
            fullName: "Krisnu Artha",
            born: 1815,
          }
        );
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log(userSignUp.user.uid);
      addToast({
        title: "Sign Up Successful",
        description: "Your account has been created successfully.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
      });
    } catch (error) {
      throw error;
    }
  };
  const signIn = async (email, password) => {
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      addToast({
        title: "Signed In",
        description: "You have successfully signed in.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
      });
      console.log({ userSignIn });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ userLogin, loadUserLogin, handleLogout, signUp, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
