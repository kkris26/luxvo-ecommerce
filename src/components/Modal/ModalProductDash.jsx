import {
  Modal,
  ModalContent,
  ModalBody,
  Image,
  Divider,
  ScrollShadow,
  ModalHeader,
} from "@heroui/react";

export default function ModalProductDash({
  isOpen,
  onOpenChange,
  size = "3xl",
  children,
  setAddProduct,
}) {
  const handleCloseModal = () => {
    onOpenChange(false);
    setAddProduct(false);
  };
  return (
    <>
      <Modal
        size={size}
        isOpen={isOpen}
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
