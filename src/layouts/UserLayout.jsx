import { Outlet, useNavigate } from "react-router";
import { addToast } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

const UserLayout = () => {
  const navigate = useNavigate();
  const { userLogin, loadUserLogin, userFullName, loadUserProfile } =
    useContext(AuthContext);

  useEffect(() => {
    if (!loadUserLogin && !userLogin) {
      navigate("/?auth=signin");
    }
    if (!loadUserLogin && !loadUserProfile && userFullName) {
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
          title: `Welcome ${userFullName || "User"}!`,
          description: "Happy to have you here again.",
          hideIcon: true,
          radius: "sm",
          timeout: 3000,
        });
      }
    }
  }, [userLogin, loadUserLogin, navigate, loadUserProfile, userFullName]);

  const tabMenus = [
    { key: "profile", name: "Profile", path: "/user" },
    { key: "cart", name: "Cart", path: "/user/cart" },
    { key: "favorite", name: "Favorite", path: "/user/favorite" },
    { key: "contact", name: "Contact", path: "/user/contact" },
  ];

  return (
    !loadUserLogin &&
    userLogin && (
      <DashboardLayout
        tabMenus={tabMenus}
        userLogin={userLogin}
        userFullName={userFullName}
      >
        <Outlet />
      </DashboardLayout>
    )
  );
};

export default UserLayout;
