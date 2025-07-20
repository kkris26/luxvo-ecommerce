import { Outlet, useNavigate } from "react-router";
import { addToast } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userLogin, loadUserLogin, userProfile } = useContext(AuthContext);
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
    { key: "dashboard", name: "Dashboard", path: "/admin" },
    { key: "products", name: "Products", path: "/admin/products" },
    { key: "orders", name: "Orders", path: "/admin/orders" },
    { key: "customers", name: "Customers", path: "/admin/customers" },
    { key: "reports", name: "Reports", path: "/admin/reports" },
  ];

  return (
    !loadUserLogin &&
    userLogin?.email === "admin@luxvo.com" && (
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

export default AdminLayout;
