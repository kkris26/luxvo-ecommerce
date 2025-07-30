import {
  Modal,
  ModalContent,
  ModalBody,
  ScrollShadow,
  addToast,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setMode,
  setOpenModal,
} from "../../../../redux/features/category/manageCategorySlice";

export default function ModalHandleCategory({ children }) {
  const dispatch = useDispatch();
  const { openModal, onEdit } = useSelector((state) => state.manageCategory);

  const handleCloseModal = () => {
    if (onEdit) {
      dispatch(setMode("warning"));
      return;
    }
    dispatch(setOpenModal(false));
    setTimeout(() => {
      dispatch(setMode(null));
      dispatch(setCategory(null));
    }, 350);
  };

  return (
    <>
      <Modal
        size="xl"
        isOpen={openModal}
        onOpenChange={handleCloseModal}
        className="py-4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <ScrollShadow className="w-full flex-col flex items-center justify-start sm:max-h-150 overflow-auto">
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
