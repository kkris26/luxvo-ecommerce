import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../configs/auth";
import { addToast } from "@heroui/react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loadUserLogin, setLoadUserLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
        setLoadUserLogin(false);
      } else {
        setLoadUserLogin(false);
      }
      return () => unsubscribe(); // bersihkan listener saat unmount
    });
  }, []);

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
      await createUserWithEmailAndPassword(auth, email, password);
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
      await signInWithEmailAndPassword(auth, email, password);
      addToast({
        title: "Signed In",
        description: "You have successfully signed in.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
      });
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
