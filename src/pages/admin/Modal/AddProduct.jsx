import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  addToast,
  Textarea,
} from "@heroui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "../../../db/db";
const AddProduct = ({ getProducts, setLoading }) => {
  const [errors, setErrors] = React.useState({});
  const [loadingAddProduct, setLoadingAddProduct] = useState(false);
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

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setLoadingAddProduct(true);
      setLoading(true);
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const newErrors = {};
      console.log(data);
      const handleAddproduct = async () => {
        const docRef = await addDoc(collection(db, "products"), data);
      };
      addToast({
        title: "Product Added",
        description: "Add Product Successfully",
        timeout: 3000,
        size: "sm",
        color: "success",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
      handleAddproduct();
      getProducts();
    } catch (error) {
      console.log("error", error);
      addToast({
        title: "Error",
        description: "Something went wrong !",
        timeout: 3000,
        size: "sm",
        color: "danger",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoadingAddProduct(false);
      setLoading(false);
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
          />
        ))}

        <Select
          isRequired
          label="Product Category"
          labelPlacement="outside"
          name="category"
          placeholder="Product Category"
          variant="underlined"
          aria-hidden={false}
        >
          {productCategories.map((c) => (
            <SelectItem aria-hidden={false} key={c.uid}>
              {c.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          label="Product Status"
          labelPlacement="outside"
          name="status"
          placeholder="Product Status"
          variant="underlined"
          aria-hidden={false}
        >
          {statusOptions.map((c) => (
            <SelectItem aria-hidden={false} key={c.uid}>
              {c.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Textarea
        isRequired
        className="w-full mt-4"
        label="Product Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        variant="underlined"
        name="description"
      />

      <div className="flex gap-4 mt-8">
        <Button
          isLoading={loadingAddProduct}
          className="w-full"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button type="reset" className="w-full px-10" variant="bordered">
          Add New Product
        </Button>
      </div>
    </Form>
  );
};

export default AddProduct;
