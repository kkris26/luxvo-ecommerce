import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Outlet } from "react-router";

const MainLayout = () => {
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
