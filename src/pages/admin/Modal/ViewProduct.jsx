import { Button, Divider, Image } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../service/formatter";
import {
  confirmDelete,
  setMode,
  setOpenModal,
  setProductToDelete,
  setSelectedProduct,
} from "../../../redux/store/product/manageProductSlice";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.manageProduct);
  const { categories } = useSelector((state) => state.manageCategory);

  const productDetails = [
    {
      key: "price",
      label: "Price",
      value: currencyFormat(selectedProduct?.price),
    },
    {
      key: "category",
      label: "Category",
      value: categories.find((c) => c.id === selectedProduct?.category)?.name,
    },
    {
      key: "stock",
      label: "Stock",
      value: selectedProduct?.stock,
    },
    {
      key: "status",
      label: "Status",
      value: selectedProduct?.status,
    },
  ];
  const statusColorMap = {
    publish: "success",
    nonactive: "danger",
    draft: "warning",
  };
  return (
    <div className="flex flex-col gap-3 sm:p-4 w-full">
      <div className="flex gap-6 flex-col sm:flex-row sm:items-center">
        <Image
          isZoomed
          alt={selectedProduct?.name}
          src={selectedProduct?.imgUrl}
          width={"full"}
          radius="sm"
          className="w-full h-auto sm:h-[300px] object-cover bg-default-100 aspect-3/2"
        />

        <div className="flex flex-col gap-2 p-0 sm:w-1/2">
          <h2 className="text-xl font-semibold">{selectedProduct?.name}</h2>

          <Divider className="my-1 bg-divider/30" />

          <div className="flex flex-col gap-1 sm:gap-2">
            {productDetails.map((pd) => (
              <div className="flex gap-2 items-center" key={pd.key}>
                <span className="text-sm w-20">{pd.label}</span>
                <p>
                  :{" "}
                  <span
                    className={`text-base  capitalize ${
                      pd.key === "status" && `text-${statusColorMap[pd.value]}`
                    }`}
                  >
                    {pd.value}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              color="secondary"
              startContent={<AiFillEdit className="text-base" />}
              onPress={() => {
                dispatch(setOpenModal(true)), dispatch(setMode("edit"));
              }}
            >
              Edit
            </Button>
            <Button
              color="danger"
              startContent={<MdDelete className="text-base" />}
              onPress={() => {
                dispatch(confirmDelete());

                dispatch(
                  setProductToDelete({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                  })
                );
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Divider className="my-2 bg-divider/30" />
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm text-default-500 leading-relaxed">
          {selectedProduct?.description}
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
