import { Button, Form, Input, Textarea } from "@heroui/react";
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOnChange,
  onSubmit,
} from "../../../../redux/features/category/manageCategorySlice";

const HandleCategory = () => {
  const categoriesField = [
    { key: "name", label: "Category Name", type: "text", required: true },
    { key: "imgUrl", label: "Image URL", type: "url", required: true },
  ];

  const dispatch = useDispatch();
  const { newCategory, mode, category } = useSelector(
    (state) => state.manageCategory
  );
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (mode === "add") {
      dispatch(onSubmit(newCategory));
    } else {
      dispatch(onSubmit(category));
    }
  };

  return (
    <>
      <Form
        className="w-full flex items-center flex-col gap-3"
        onSubmit={handleAddCategory}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {categoriesField.map((cf) => (
            <Input
              key={cf.key}
              isRequired={cf.required}
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please fill out this field.";
                }
                if (cf.key === "imgUrl" && validationDetails?.typeMismatch) {
                  return "Please enter a valid URL.";
                }
              }}
              className="w-full"
              label={cf.label}
              labelPlacement="outside"
              name={cf.key}
              placeholder={`Enter ${cf.label}`}
              variant="underlined"
              endContent={
                cf.key === "imgUrl" && <FileUpload type={"category"} />
              }
              value={
                mode === "add"
                  ? newCategory?.[cf.key] || ""
                  : category?.[cf.key]
              }
              onChange={(e) => dispatch(handleOnChange(e))}
              type={cf.type}
            />
          ))}
        </div>
        <Textarea
          labelPlacement="outside"
          className=""
          label="Description"
          name="description"
          placeholder="Enter your description"
          variant="underlined"
          value={
            mode === "add"
              ? newCategory?.description || ""
              : category?.description
          }
          onChange={(e) => dispatch(handleOnChange(e))}
        />
        <Button type="submit" className="mt-4" color="primary">
          {mode === "add" ? "Add Category" : "Update Category"}
        </Button>
      </Form>
    </>
  );
};

export default HandleCategory;
