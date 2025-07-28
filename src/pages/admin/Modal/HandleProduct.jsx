import { useState } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddproduct,
  handleEditProduct,
  handleOnChange,
  setOnEdit,
  setOpenModal,
  setSelectedProduct,
} from "../../../redux/store/product/manageProductSlice";
import FileUpload from "../../../components/FileUpload/FileUpload";
const HandleProduct = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loadingAddProduct, mode, selectedProduct, onEdit } = useSelector(
    (state) => state.manageProduct
  );

  const productFields = [
    {
      name: "name",
      label: "Name",
      valueKey: "name",
      type: "text",
    },
    { name: "price", label: "Price", valueKey: "price", type: "number" },
    { name: "stock", label: "Stock", valueKey: "stock", type: "number" },
    { name: "imgUrl", label: "Image Url", valueKey: "imgUrl", type: "link" },
  ];
  const statusOptions = [
    { name: "Publish", uid: "publish" },
    { name: "Draft", uid: "draft" },
    { name: "Non ACtive", uid: "nonactive" },
  ];
  const productCategories = [
    { name: "Shoes", uid: "shoes" },
    { name: "Shirt", uid: "shirt" },
    { name: "Short", uid: "short" },
  ];
  const selectFields = [
    {
      label: "Product Category",
      name: "category",
      placeholder: "Select category",
      options: productCategories,
    },
    {
      label: "Product Status",
      name: "status",
      placeholder: "Select status",
      options: statusOptions,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      dispatch(handleAddproduct(selectedProduct));
    } else {
      dispatch(handleEditProduct(selectedProduct, selectedProduct.id));
    }
    setErrors({});
  };

  return (
    <Form
      className="w-full justify-center items-center"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <div className=" grid sm:grid-cols-2 w-full gap-6">
        {productFields.map((f) => (
          <div className="flex items-center gap-2" key={f.valueKey}>
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please fill out this field.";
                }

                return errors.name;
              }}
              label={`Product ${f.label}`}
              labelPlacement="outside"
              name={f.name}
              // isDisabled={f.name === "imgUrl"}
              type={f.type}
              key={f.valueKey}
              placeholder={`${
                f.name === "imgUrl" ? "Enter or upload" : "Enter product"
              } 
 ${f.label.toLowerCase()}`}
              variant="underlined"
              value={selectedProduct?.[f.name] || ""}
              onChange={(e) => dispatch(handleOnChange(e))}
            />
            {f.name === "imgUrl" && <FileUpload />}
          </div>
        ))}

        {selectFields.map((f) => (
          <Select
            key={f.name}
            isRequired
            label={f.label}
            labelPlacement="outside"
            name={f.name}
            placeholder={f.placeholder}
            variant="underlined"
            selectedKeys={[selectedProduct?.[f.name]]}
            onChange={(e) => dispatch(handleOnChange(e))}
          >
            {f.options.map((option) => (
              <SelectItem key={option.uid} value={option.uid}>
                {option.name}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>
      <Textarea
        isRequired
        className="w-full mt-4"
        label="Product Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        variant="underlined"
        name="description"
        value={selectedProduct?.description || ""}
        onChange={(e) => dispatch(handleOnChange(e))}
      />

      <div className="flex gap-4 mt-8">
        <Button
          isLoading={loadingAddProduct}
          className="w-full px-10"
          color="primary"
          type="submit"
        >
          {mode === "edit" ? "Update Product" : "Add Product"}
        </Button>
        {mode === "add" && selectedProduct && (
          <Button
            onPress={() => {
              dispatch(setOnEdit(false)), dispatch(setSelectedProduct(null));
            }}
            className="w-full px-10"
            variant="bordered"
          >
            Reset
          </Button>
        )}
      </div>
    </Form>
  );
};

export default HandleProduct;
