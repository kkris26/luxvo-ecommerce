import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider />
        <App />
        <Analytics />
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
