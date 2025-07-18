import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Outlet } from "react-router";
import "../main.css";

const MainLayout = () => {
  console.log("main layout");
  return (
    <>
      <NavbarHeader />
      <div className="px-4 max-w-7xl  mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
