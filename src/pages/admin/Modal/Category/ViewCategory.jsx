import { Button, Divider, Image } from "@heroui/react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryToDelete,
  setMode,
} from "../../../../redux/features/category/manageCategorySlice";

const ViewCategory = () => {
  const dispatch = useDispatch();
  const { categories, category } = useSelector((state) => state.manageCategory);
  return (
    <div className="flex gap-6 flex-col sm:flex-row sm:items-center">
      <Image
        isZoomed
        alt={category?.name}
        src={category?.imgUrl}
        width={"full"}
        radius="sm"
        className=" h-auto sm:h-[300px] object-cover aspect-3/2 bg-default-100"
      />
      <div className="sm:w-1/2 gap-2 flex flex-col">
        <Divider className="my-1 bg-divider/30" />
        <h2 className="font-bold text-lg">{category?.name}</h2>
        <p className="text-sm">{category?.description}</p>
        <div className="flex gap-2 mt-4">
          <Button
            color="secondary"
            size="sm"
            startContent={<AiFillEdit className="text-base" />}
            onPress={() => dispatch(setMode("edit"))}
          >
            Edit
          </Button>
          <Button
            color="danger"
            size="sm"
            startContent={<MdDelete className="text-base" />}
            onPress={() => {
              dispatch(setMode("delete"));
              dispatch(
                setCategoryToDelete({
                  id: category.id,
                  name: category.name,
                })
              );
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
