import { Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import {
  handleCloseModal,
  setSafeToClose,
} from "../../../redux/store/product/manageProductSlice";

const WarningCloseModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Discard Changes?</h2>
      <p>Unsaved data will be lost. Are you sure?</p>
      <div className="flex gap-4 justify-end">
        <Button
          color="default"
          variant="light"
          onPress={() => dispatch(setSafeToClose(true))}
        >
          Back
        </Button>
        <Button
          color="danger"
          onPress={() => {
            dispatch(handleCloseModal());
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default WarningCloseModal;
