import { RouterProvider } from "react-router";
import { router } from "./routes/route";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import ModalContextProvider from "./context/ModalContext";

const App = () => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <RouterProvider router={router} />
      </ModalContextProvider>
    </AuthContextProvider>
  );
};

export default App;
