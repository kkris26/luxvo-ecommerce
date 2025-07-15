import {
  addToast,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@heroui/react";
import { GoPerson } from "react-icons/go";
import { TbMenu } from "react-icons/tb";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import RightSideBar from "../SideBar/RightSideBar";
import { auth } from "../../configs/auth";
import UserProfile from "./UserProfile";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarHeader() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
      } else {
      }
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
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <TbMenu className="cursor-pointer text-2xl" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {userLogin ? (
            <UserProfile logOut={handleLogout} user={userLogin} />
          ) : (
            <GoPerson className="cursor-pointer text-xl" onClick={onOpen} />
          )}
        </NavbarItem>
        <RightSideBar isOpen={isOpen} onOpenChange={onOpenChange} />
      </NavbarContent>
    </Navbar>
  );
}
