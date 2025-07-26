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
} from "../../../redux/store/product/manageProductSlice";
const HandleProduct = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loadingAddProduct, mode, productToEdit } = useSelector(
    (state) => state.manageProduct
  );

  console.log(productToEdit);
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
      placeholder: "Select Category",
      options: productCategories,
    },
    {
      label: "Product Status",
      name: "status",
      placeholder: "Select Status",
      options: statusOptions,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (mode === "add") {
      dispatch(handleAddproduct(data));
    } else {
      dispatch(handleEditProduct(data, productToEdit.id));
    }
    setErrors({});
  };

  return (
    <Form
      className="w-full justify-center items-center"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <div className=" grid grid-cols-2 w-full gap-6">
        {productFields.map((f) => (
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
            type={f.type}
            key={f.valueKey}
            placeholder={`Enter product ${f.label.toLowerCase()}`}
            variant="underlined"
            value={mode === "edit" ? productToEdit?.[f.name] : undefined}
            onChange={
              mode === "edit" ? (e) => dispatch(handleOnChange(e)) : undefined
            }
          />
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
            selectedKeys={
              mode === "edit" ? [productToEdit?.[f.name]] : undefined
            }
            onChange={
              mode === "edit" ? (e) => dispatch(handleOnChange(e)) : undefined
            }
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
        value={mode === "edit" ? productToEdit?.description : undefined}
        onChange={
          mode === "edit" ? (e) => dispatch(handleOnChange(e)) : undefined
        }
      />

      <div className="flex gap-4 mt-8">
        <Button
          isLoading={loadingAddProduct}
          className="w-full"
          color="primary"
          type="submit"
        >
          {mode === "edit" ? "Update Product" : "Add Product"}
        </Button>
        {/* {mode !== "edit" && (
          <Button type="reset" className="w-full px-10" variant="bordered">
            Add New Product
          </Button>
        )} */}
      </div>
    </Form>
  );
};

export default HandleProduct;
