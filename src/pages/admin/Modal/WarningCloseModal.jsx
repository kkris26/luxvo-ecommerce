import { Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import {
  handleCloseModal,
  setSafeToClose,
} from "../../../redux/features/product/manageProductSlice";

const WarningCloseModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Discard Changes?</h2>
      <p>Unsaved data will be lost. Are you sure?</p>
      <div className="flex gap-4 justify-end">
        <Button
          variant="light"
          color="danger"
          onPress={() => {
            dispatch(handleCloseModal());
          }}
        >
          Close
        </Button>
        <Button color="primary" onPress={() => dispatch(setSafeToClose(true))}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default WarningCloseModal;
