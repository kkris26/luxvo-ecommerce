import { Outlet, useNavigate } from "react-router";
import { addToast } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

const UserLayout = () => {
  const navigate = useNavigate();
  const { userLogin, loadUserLogin, userProfile } = useContext(AuthContext);

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
          title: `Welcome ${userProfile?.fullName || "User"}!`,
          description: "Happy to have you here again.",
          hideIcon: true,
          radius: "sm",
          timeout: 3000,
        });
      }
    }
  }, [userLogin, loadUserLogin, navigate, userProfile]);

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
        userProfile={userProfile}
      >
        <Outlet />
      </DashboardLayout>
    )
  );
};

export default UserLayout;
