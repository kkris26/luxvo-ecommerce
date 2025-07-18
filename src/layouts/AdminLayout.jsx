import { Outlet, useLocation, useNavigate } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  addToast,
  Button,
  Divider,
} from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import LinkWrapper from "../components/Wrapper/LinkWrapper";
import UserProfile from "../components/Navbar/UserProfile";
import { HiOutlineChevronRight } from "react-icons/hi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const AdminLayout = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { userLogin, loadUserLogin } = useContext(AuthContext);
  const [collapseMenu, setCollapseMenu] = useState(false);
  useEffect(() => {
    if (!loadUserLogin) {
      if (!userLogin || userLogin.email !== "admin@luxvo.com") {
        navigate("/?auth=signin");
        addToast({
          title: "Access Denied !",
          description: "You are not authorized",
          timeout: 3000,
          size: "sm",
          color: "danger",
          radius: "sm",
          shouldShowTimeoutProgress: true,
        });
      }
      if (userLogin?.email === "admin@luxvo.com") {
        addToast({
          title: `Welcome ${userLogin?.profile?.fullName || "User"}!`,
          description: "Happy to have you here again.",
          hideIcon: true,
          radius: "sm",
          timeout: 3000,
        });
      }
    }
  }, [userLogin, loadUserLogin, navigate]);

  const tabMenus = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    !loadUserLogin &&
    userLogin?.email === "admin@luxvo.com" && (
      <div className="h-screen px-6 py-4 flex gap-3 flex-col">
        <Navbar
          maxWidth="full"
          position="static"
          className="bg-default-100 rounded-lg"
          classNames={{
            wrapper: "px-4",
          }}
        >
          <NavbarBrand className="px-0">
            <p className="font-bold text-inherit">
              Hi, {userLogin?.profile?.fullName || "Admin"} 👋
            </p>
          </NavbarBrand>

          <NavbarContent as="div" justify="end">
            <UserProfile />
          </NavbarContent>
        </Navbar>
        <div className="flex gap-3 h-full">
          <div className=" flex flex-col rounded-lg  h-full  bg-default-100 p-2">
            <Button
              onPress={() => setCollapseMenu((prev) => !prev)}
              radius="sm"
              variant="light"
              isIconOnly={collapseMenu}
              color="default"
              startContent={
                <TbLayoutSidebarLeftCollapse
                  strokeWidth={1}
                  className="text-xl"
                />
              }
              className={`text-black text-start flex items-center ${
                collapseMenu ? "" : "justify-start"
              } `}
            >
              {!collapseMenu && "Collapse"}
            </Button>
            <Divider className="mb-2 mt-2 " />
            <Tabs
              variant="light"
              className=""
              aria-label="Options"
              selectedKey={pathname}
              color="primary"
              isVertical
              size="lg"
              radius="sm"
            >
              {!collapseMenu &&
                tabMenus.map((menu) => (
                  <Tab
                    className="w-40 block text-start font-normal tracking text-md text-white"
                    key={menu.path}
                    title={
                      <LinkWrapper
                        className={"flex items-center justify-between"}
                        path={menu.path}
                      >
                        {menu.name}
                        {pathname === menu.path && <HiOutlineChevronRight />}
                      </LinkWrapper>
                    }
                  ></Tab>
                ))}
            </Tabs>
          </div>
          <div className="bg-default-100 w-full rounded-lg p-4">
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLayout;
