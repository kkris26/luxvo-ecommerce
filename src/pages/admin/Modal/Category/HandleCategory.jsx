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
    { key: "imgUrl", label: "Image URL", type: "text" },
  ];

  const dispatch = useDispatch();
  const { newCategory } = useSelector((state) => state.manageCategory);
  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(onSubmit(newCategory));
  };

  return (
    <>
      <Form className="w-full flex flex-col gap-3" onSubmit={handleAddCategory}>
        <div className="flex gap-4 w-full">
          {categoriesField.map((cf) => (
            <Input
              key={cf.key}
              isRequired={cf.required}
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please fill out this field.";
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
              value={newCategory?.[cf.key]}
              onChange={(e) => dispatch(handleOnChange(e))}
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
          value={newCategory?.description}
          onChange={(e) => dispatch(handleOnChange(e))}
        />
        <Button type="submit" className="mt-4" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default HandleCategory;
