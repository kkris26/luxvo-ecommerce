import { Divider, Image } from "@heroui/react";

const EditProduct = ({ selectedProduct }) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex gap-6 items-center">
        <Image
          alt={selectedProduct.name}
          src={selectedProduct.imgUrl}
          width={"full"}
          radius="sm"
          className=" object-cover "
        />

        <div className="flex flex-col gap-2 p-0">
          <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>

          <Divider className="my-2" />

          <p className=" text-default-600 ">
            <span className="font-medium">Price:</span> Rp{" "}
            {selectedProduct.price.toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-default-600">
            <span className="font-medium">Category:</span>{" "}
            {selectedProduct.category}
          </p>
          <p className="text-sm text-default-600">
            <span className="font-medium">Stock:</span> {selectedProduct.stock}
          </p>
          <p className="text-sm text-default-600">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={
                selectedProduct.status === "publish"
                  ? "text-success"
                  : selectedProduct.status === "draft"
                  ? "text-warning"
                  : "text-gray-500"
              }
            >
              {selectedProduct.status}
            </span>
          </p>
        </div>
      </div>
      <div>
        <Divider className="my-2" />
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm text-default-500 leading-relaxed">
          {selectedProduct.description}
        </p>
      </div>
    </div>
  );
};

export default EditProduct;
