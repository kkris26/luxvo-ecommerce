import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteProduct,
  setOpenModal,
  setProductToDelete,
} from "../../../redux/store/product/manageProductSlice";

export const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { productToDelete, mode } = useSelector((state) => state.manageProduct);

  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Warning !</h2>
      <p>
        Are You Sure want to delete{" "}
        <span className="font-bold">{productToDelete?.name} </span> ?
      </p>
      <div className="flex gap-4 justify-end">
        <Button
        variant="light"
          color="danger"
          onPress={() => {
            dispatch(handleDeleteProduct(productToDelete.id));
            dispatch(setOpenModal(false));
          }}
        >
          Delete
        </Button>
        <Button
          color="primary"

          onPress={() => {
            mode
              ? dispatch(setProductToDelete(null))
              : dispatch(setOpenModal(false));
          }}
        >
          {mode ? "Back" : "Close"}
        </Button>
      </div>
    </div>
  );
};

export const HeaderConfirmDelete = () => {};
