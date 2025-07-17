import {
  addToast,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { GoPerson } from "react-icons/go";
import { TbMenu } from "react-icons/tb";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import RightSideBar from "../SideBar/RightSideBar";
import { auth } from "../../configs/auth";
import UserProfile from "./UserProfile";
import PopupModal from "../Modal/PopupModal";
import { Link } from "react-router";

export default function NavbarHeader() {
  const [userLogin, setUserLogin] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadUserLogin, setLoadUserLogin] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
        setLoadUserLogin(false);
      } else {
        setLoadUserLogin(false);
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
    <>
      <Navbar
        isBlurred={"false"}
        maxWidth="2xl"
        classNames={{
          wrapper: "px-4 max-w-7xl",
        }}
      >
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <TbMenu className="cursor-pointer text-2xl" />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
          <Link to={"/"}>
            <NavbarBrand>
              <p className="font-extralight text-2xl tracking-widest">LÜXVO</p>
            </NavbarBrand>
          </Link>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {userLogin ? (
              <>
                <UserProfile user={userLogin} setModalOpen={setModalOpen} />
              </>
            ) : (
              <GoPerson
                className="cursor-pointer text-xl"
                onClick={() => !loadUserLogin && setSidebarOpen(true)}
              />
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <RightSideBar isOpen={isSidebarOpen} onOpenChange={setSidebarOpen} />
      <PopupModal
        logOut={handleLogout}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
