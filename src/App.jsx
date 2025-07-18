import { RouterProvider } from "react-router";
import { router } from "./routes/route";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
