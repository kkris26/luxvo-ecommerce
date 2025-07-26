import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteProduct,
  setOpenModal,
} from "../../../redux/store/product/manageProductSlice";

export const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { productToDelete } = useSelector((state) => state.manageProduct);

  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Warning !</h2>
      <p>
        Are You Sure want to delete{" "}
        <span className="font-bold">{productToDelete?.name} </span> ?
      </p>
      <div className="flex gap-4 justify-end">
        <Button
          color="default"
          variant="light"
          onPress={() => dispatch(setOpenModal(false))}
        >
          Close
        </Button>
        <Button
          color="danger"
          onPress={() => {
            dispatch(handleDeleteProduct(productToDelete.id));
            dispatch(setOpenModal(false));
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export const HeaderConfirmDelete = () => {};
