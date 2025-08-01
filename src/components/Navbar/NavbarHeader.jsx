import {
  addToast,
  Badge,
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
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import MenuSideBar from "../SideBar/MenuSideBar";
import MainLogo from "../Logo/MainLogo";
import CartSideBar from "../SideBar/CartSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from "../../redux/features/cart/manageCartSlice";

export default function NavbarHeader() {
  const dispatch = useDispatch();
  const { userLogin, loadUserLogin } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuSideOpen, setMenuSideOpen] = useState(false);
  const { loadingCart, userCarts } = useSelector((state) => state.manageCart);
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
          <NavbarItem
            onClick={() => setMenuSideOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <TbMenu strokeWidth={1} className="cursor-pointer text-2xl" />
            <p className="text-xs font-light tracking-widest">MENU</p>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
          <Link to={"/"}>
            <NavbarBrand>
              <MainLogo />
            </NavbarBrand>
          </Link>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <IoSearchOutline className="text-xl" />
          </NavbarItem>
          <NavbarItem>
            <Badge
              color="primary"
              size="sm"
              hidden={userCarts.length === 0}
              content={userCarts.length}
            >
              <IoCartOutline
                className="text-xl cursor-pointer"
                onClick={() => dispatch(setCartOpen(true))}
              />
            </Badge>
          </NavbarItem>
          <NavbarItem>
            {userLogin ? (
              <>
                <UserProfile user={userLogin} />
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
      <MenuSideBar isOpen={isMenuSideOpen} onOpenChange={setMenuSideOpen} />
      <CartSideBar />
    </>
  );
}
