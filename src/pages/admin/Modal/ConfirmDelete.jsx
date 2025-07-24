import { Button } from "@heroui/react";

export const ConfirmDelete = ({
  productToDelete,
  setOpenModal,
  handleDeleteProducts,
}) => {
  return (
    <div className="flex gap-5 flex-col  w-full">
      <h2 className="text-xl font-bold">Warning !</h2>
      <p>
        Are You Sure want to delete{" "}
        <span className="font-bold">{productToDelete.name} </span> ?
      </p>
      <div className="flex gap-4 justify-end">
        <Button
          color="default"
          variant="light"
          onPress={() => setOpenModal(false)}
        >
          Close
        </Button>
        <Button
          color="danger"
          onPress={() => {
            handleDeleteProducts(productToDelete.id), setOpenModal(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export const HeaderConfirmDelete = () => {};
