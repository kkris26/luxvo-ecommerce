import { Outlet, useNavigate } from "react-router";
import { addToast } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, } from "react";
import DashboardLayout from "./DashboardLayout";

const UserLayout = () => {
  const navigate = useNavigate();
  const { userLogin, loadUserLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!loadUserLogin) {
      if (!userLogin) {
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
      } else {
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
    { name: "Porfile", path: "/user" },
    { name: "Cart", path: "/user/cart" },
    { name: "Favorite", path: "/user/favorite" },
    { name: "Contact", path: "/user/contact" },
  ];

  return (
    !loadUserLogin &&
    userLogin && (
      <DashboardLayout tabMenus={tabMenus} userLogin={userLogin}>
        <Outlet />
      </DashboardLayout>
    )
  );
};

export default UserLayout;
