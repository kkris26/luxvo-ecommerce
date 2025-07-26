import { Modal, ModalContent, ModalBody, ScrollShadow } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  setOpenModal,
} from "../../redux/store/product/manageProductSlice";

export default function ModalProductDash({ size = "3xl", children }) {
  const dispatch = useDispatch();
  const { openModal } = useSelector((state) => state.manageProduct);

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setMode(null));
  };

  return (
    <>
      <Modal
        size={size}
        isOpen={openModal}
        onOpenChange={handleCloseModal}
        className="py-4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <ScrollShadow className="w-full flex-col flex items-center justify-center max-h-120 overflow-auto">
                  {children}
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
