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
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);
export default function AuthContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loadUserLogin, setLoadUserLogin] = useState(true);

  const [userProfile, setUserProfile] = useState(null);
  const [loadUserProfile, setLoadUserProfile] = useState(true);

  const [userProfileImg, setUserProfileImg] = useState("");
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLogin(user);

        try {
          await handleGetProfileUser(user.uid);
        } catch (err) {
          console.error("Failed to get profile:", err);
        } finally {
          setLoadUserLogin(false);
        }
      } else {
        setLoadUserLogin(false);
        setLoadUserProfile(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGetProfileUser = async (userId) => {
    setLoadUserProfile(true);
    try {
      const profileSnap = await getDoc(
        doc(db, "users", userId, "profile", "main")
      );
      const profileData = profileSnap.data();

      if (profileData) {
        setUserProfile(profileData);
        setUserLogin((prev) => ({ ...prev, profile: profileData }));
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoadUserProfile(false);
    }
  };

  useEffect(() => {
    if (!loadUserProfile) {
      setUserFullName(
        userProfile?.fullName ? userProfile?.fullName : userLogin?.displayName
      );
      setUserProfileImg(
        userProfile?.imgUrl ? userProfile?.imgUrl : userLogin?.photoURL
      );
    }
  }, [userProfile, userLogin, loadUserProfile]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          addToast({
            title: "Logout",
            description: "Log Out Successfully",
            timeout: 3000,
            size: "sm",
            color: "success",
            radius: "sm",
            shouldShowTimeoutProgress: true,
          });
        }, 100);
        setUserLogin(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        throw error;
      });
  };

  const signUp = async (fullName, email, password) => {
    try {
      const userSignUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        await setDoc(doc(db, "users", userSignUp.user.uid, "profile", "main"), {
          fullName,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      addToast({
        title: "Sign Up Successful",
        description: "Your account has been created successfully.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
        radius: "sm",
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
        radius: "sm",
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext
      value={{
        userLogin,
        loadUserLogin,
        loadUserProfile,
        handleLogout,
        signUp,
        signIn,
        userProfile,
        userProfileImg,
        userFullName,
        handleGetProfileUser,
      }}
    >
      {children}
    </AuthContext>
  );
}
