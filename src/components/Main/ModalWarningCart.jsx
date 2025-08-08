import {
  Modal,
  ModalContent,
  ModalBody,
  ScrollShadow,
  Button,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCartUpdate,
  setOpenModalCart,
  setProductToRemove,
} from "../../redux/features/cart/manageCartSlice";

const ModalWarningCart = ({ children }) => {
  const dispatch = useDispatch();
  const { openModalCart, productToRemove } = useSelector(
    (state) => state.manageCart
  );
  const handleCloseModal = () => {
    dispatch(setOpenModalCart(false));
    setTimeout(() => {
      dispatch(setProductToRemove(null));
    }, 300);
  };

  return (
    <>
      <Modal
        size={"lg"}
        isOpen={openModalCart}
        onOpenChange={handleCloseModal}
        className="py-4"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex gap-5 flex-col  w-full">
              <h2 className="text-xl font-bold">Warning !</h2>
              <p className="text-base ">
                Remove{" "}
                <span className="font-semibold">
                  {productToRemove?.productName}
                </span>{" "}
                from your cart?
              </p>
              <div className="flex gap-4 justify-end">
                <Button variant="light" onPress={handleCloseModal}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleCloseModal();
                    dispatch(
                      handleCartUpdate(
                        productToRemove.userID,
                        productToRemove.productID,
                        "delete"
                      )
                    );
                  }}
                >
                  Yes, Remove
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWarningCart;
