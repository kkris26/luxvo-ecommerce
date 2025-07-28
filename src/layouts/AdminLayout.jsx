import { Outlet, useNavigate } from "react-router";
import { addToast } from "@heroui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userLogin, loadUserLogin, userFullName, loadUserProfile } =
    useContext(AuthContext);

  const allowedEmails = ["admin@luxvo.com", "krisnuartha09@gmail.com"];
  const isAuthorized =
    !loadUserLogin && allowedEmails.includes(userLogin?.email);

  useEffect(() => {
    if (!loadUserLogin && !loadUserProfile && userFullName) {
      if (isAuthorized) {
        addToast({
          title: `Welcome ${userFullName || "User"}!`,
          description: "Happy to have you here again.",
          hideIcon: true,
          radius: "sm",
          timeout: 3000,
        });
      } else {
        navigate("/?auth=signin");
        addToast({
          title: "Access Denied!",
          description: "You are not authorized",
          timeout: 3000,
          size: "sm",
          color: "danger",
          radius: "sm",
          shouldShowTimeoutProgress: true,
        });
      }
    }
  }, [userLogin, loadUserLogin, navigate, loadUserProfile, userFullName]);

  const tabMenus = [
    { key: "dashboard", name: "Dashboard", path: "/admin" },
    { key: "products", name: "Products", path: "/admin/products" },
    { key: "orders", name: "Orders", path: "/admin/orders" },
    { key: "customers", name: "Customers", path: "/admin/customers" },
    { key: "reports", name: "Reports", path: "/admin/reports" },
  ];

  return (
    isAuthorized && (
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

export default AdminLayout;
