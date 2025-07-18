import { createContext, useState } from "react";
import PopupModal from "../components/Modal/PopupModal";

export const ModalContext = createContext(null);
const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <ModalContext value={{ setModalOpen }}>
      <PopupModal isOpen={isModalOpen} onOpenChange={setModalOpen} />
      {children}
    </ModalContext>
  );
};

export default ModalContextProvider;
