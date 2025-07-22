import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Divider,
} from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import LinkWrapper from "../components/Wrapper/LinkWrapper";
import UserProfile from "../components/Navbar/UserProfile";
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import MenuDropdown from "../components/Dashboard/MenuDropdown";

const DashboardLayout = ({ userLogin, userProfile, tabMenus, children }) => {
  const [collapseMenu, setCollapseMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="h-screen px-6 py-4 flex gap-3 flex-col">
      <Navbar
        maxWidth="full"
        position="static"
        className="bg-default-100 rounded-lg"
        classNames={{
          wrapper: "px-4",
        }}
      >
        <NavbarContent as="div" justify="start" className="gap-2 items-center">
          <MenuDropdown tabMenus={tabMenus} />
          <NavbarBrand className="px-0">
            <p className="font-bold text-inherit capitalize">
              Hi, {userProfile?.fullName || "Admin"} 👋
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <UserProfile />
        </NavbarContent>
      </Navbar>
      <div className="flex gap-3 pb-10 sm:pb-0 sm:h-full ">
        <div className=" hidden lg:flex flex-col rounded-lg  h-full justify-between  bg-default-100 p-2">
          <div>
            <Button
              onPress={() => setCollapseMenu((prev) => !prev)}
              radius="sm"
              variant="light"
              isIconOnly={collapseMenu}
              color="default"
              startContent={
                <TbLayoutSidebarLeftCollapse
                  strokeWidth={1}
                  className="text-lg"
                />
              }
              className={`text-black text-start flex w-full items-center ${
                collapseMenu ? "" : "justify-start"
              } `}
            >
              {!collapseMenu && "Collapse"}
            </Button>
            <Divider className="mb-3 mt-1 bg-divider/30 " />
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

          <Button
            radius="sm"
            variant="flat"
            isIconOnly={collapseMenu}
            color="default"
          >
            <Link
              to={"/"}
              className={`text-black text-start w-full gap-2 flex items-center ${
                collapseMenu ? "justify-center" : "justify-start"
              } `}
            >
              <HiOutlineHome strokeWidth={1.5} className="text-lg" />
              {!collapseMenu && "Homepage"}
            </Link>
          </Button>
        </div>
        <div className="bg-default-100 w-full h-full rounded-lg p-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
