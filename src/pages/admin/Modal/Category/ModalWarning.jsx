import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteCategory,
  setCategoryToDelete,
  setOpenModal,
} from "../../../../redux/features/category/manageCategorySlice";

export const ModalWarning = () => {
  const dispatch = useDispatch();
  const { categoryToDelete, mode } = useSelector(
    (state) => state.manageCategory
  );

  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Warning !</h2>
      <p>
        Are You Sure want to delete{" "}
        <span className="font-bold">{categoryToDelete?.name} </span> ?
      </p>
      <div className="flex gap-4 justify-end">
        <Button
          variant="light"
          onPress={() => {
            dispatch(setCategoryToDelete(null));
            dispatch(setOpenModal(false));
          }}
        >
          {mode === "delete" ? "Close" : "Back"}
        </Button>
        <Button
          color="danger"
          onPress={() => {
            dispatch(handleDeleteCategory(categoryToDelete.id));
            dispatch(setOpenModal(false));
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
