import { createBrowserRouter, RouterProvider } from "react-router";
import NavbarHeader from "./components/Navbar/NavbarHeader";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "terms-and-conditions", element: <TermsAndConditionsPage /> },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
