import { Outlet, useLocation, useNavigate } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  addToast,
} from "@heroui/react";
import { Tabs, Tab, Card, CardBody, Switch } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import LinkWrapper from "../components/Wrapper/LinkWrapper";

const AdminLayout = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const navigate = useNavigate();
  const { userLogin, loadUserLogin } = useContext(AuthContext);
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
          shouldShowTimeoutProgress: true,
        });
      }
    }
  }, [userLogin, loadUserLogin, navigate]);

  const tabMenus = [
    { name: "Dashboard", path: "/admin" },
    { name: "Produk", path: "/admin/product" },
    { name: "Transaksi", path: "/admin/transactions" },
    { name: "Pengguna", path: "/admin/users" },
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
            <p className="font-bold text-inherit">Hi Admin</p>
          </NavbarBrand>

          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
        <div className="flex gap-4 h-full">
          <Tabs
            variant="light"
            className="rounded-lg bg-default-100 p-2"
            aria-label="Options"
            selectedKey={pathname}
            color="primary"
            isVertical
            size="lg"
            radius="sm"
          >
            {tabMenus.map((menu) => (
              <Tab
                className="w-40 block text-start font-normal tracking text-md text-white"
                key={menu.path}
                title={
                  <LinkWrapper className={"block"} path={menu.path}>
                    {menu.name}
                  </LinkWrapper>
                }
              ></Tab>
            ))}
          </Tabs>
          <div className="bg-default-100 w-full rounded-lg p-4">
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLayout;
