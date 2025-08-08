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
import {
  handleFavorite,
  setFavoriteToRemove,
  setOpenModalFavorite,
} from "../../redux/features/favorite/favoriteSlice";

const ModalWarningFav = ({ children }) => {
  const dispatch = useDispatch();
  const { openModalFavorite, favoriteToRemove } = useSelector(
    (state) => state.favorite
  );
  const handleCloseModal = () => {
    dispatch(setOpenModalFavorite(false));
    setTimeout(() => {
      dispatch(setFavoriteToRemove(null));
    }, 300);
  };

  return (
    <>
      <Modal
        size={"lg"}
        isOpen={openModalFavorite}
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
                  {favoriteToRemove?.productName}
                </span>{" "}
                from your favorite?
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
                      handleFavorite(
                        favoriteToRemove.productID,
                        favoriteToRemove.userID,
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

export default ModalWarningFav;
