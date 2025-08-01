import {
  Modal,
  ModalContent,
  ModalBody,
  ScrollShadow,
  addToast,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../../../redux/features/category/manageCategorySlice";

export default function ModalHandleCategory({ children }) {
  const dispatch = useDispatch();
  const { openModal } = useSelector((state) => state.manageCategory);

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
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
