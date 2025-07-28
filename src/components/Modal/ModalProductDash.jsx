import {
  Modal,
  ModalContent,
  ModalBody,
  ScrollShadow,
  addToast,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  setOpenModal,
  setSafeToClose,
} from "../../redux/store/product/manageProductSlice";

export default function ModalProductDash({ size = "3xl", children }) {
  const dispatch = useDispatch();
  const { openModal, onEdit, safeToClose, mode } = useSelector(
    (state) => state.manageProduct
  );

  const handleCloseModal = () => {
    if (onEdit) {
      return dispatch(setSafeToClose(false));
    }
    dispatch(setOpenModal(false));
    setTimeout(() => {
      dispatch(setMode(null));
    }, 350);
  };

  return (
    <>
      <Modal
        size={size}
        isOpen={openModal}
        onOpenChange={handleCloseModal}
        className="py-4"
        hideCloseButton={!safeToClose || mode === "delete"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <ScrollShadow className="w-full flex-col flex items-center justify-start max-h-150 overflow-auto">
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
