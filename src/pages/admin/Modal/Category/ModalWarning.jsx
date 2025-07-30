import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteCategory,
  setCategoryToDelete,
  setMode,
  setOnEdit,
  setOpenModal,
} from "../../../../redux/features/category/manageCategorySlice";

export const ModalWarning = () => {
  const dispatch = useDispatch();
  const { categoryToDelete, mode, category, newCategory } = useSelector(
    (state) => state.manageCategory
  );

  const handleClose = () => {
    if (mode === "warning" && category) {
      return dispatch(setMode("edit"));
    } else if (mode === "warning" && newCategory) {
      return dispatch(setMode("add"));
    }
    dispatch(setOpenModal(false));
    setTimeout(() => {
      dispatch(setCategoryToDelete(null));
    }, 300);
  };
  const handleAction = () => {
    if (mode === "delete") {
      dispatch(handleDeleteCategory(categoryToDelete.id));
    }
    dispatch(setMode(null));
    dispatch(setOnEdit(false));
    dispatch(setOpenModal(false));
  };

  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">
        {mode === "warning" ? "Discard Changes?" : "Warning !"}
      </h2>
      {mode === "warning" ? (
        <p>Unsaved data will be lost. Are you sure?</p>
      ) : (
        <p>
          Are You Sure want to delete{" "}
          <span className="font-bold">{categoryToDelete?.name} </span> ?
        </p>
      )}
      <div className="flex gap-4 justify-end">
        <Button variant="light" onPress={handleClose}>
          {mode === "delete" ? "Close" : "Back"}
        </Button>
        <Button color="danger" onPress={handleAction}>
          {mode === "warning" ? "Yes" : "Delete"}
        </Button>
      </div>
    </div>
  );
};
