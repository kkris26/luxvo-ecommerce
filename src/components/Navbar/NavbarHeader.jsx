import {
  addToast,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { GoPerson } from "react-icons/go";
import { TbMenu } from "react-icons/tb";
import { useContext, useState } from "react";
import RightSideBar from "../SideBar/RightSideBar";
import UserProfile from "./UserProfile";
import PopupModal from "../Modal/PopupModal";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function NavbarHeader() {
  const { userLogin, loadUserLogin } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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
      <PopupModal isOpen={isModalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
