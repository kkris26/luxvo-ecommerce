import { Button, Image } from "@heroui/react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../../redux/features/category/manageCategorySlice";

const ViewCategory = () => {
  const dispatch = useDispatch();
  const { categories, category } = useSelector((state) => state.manageCategory);
  console.log(category);
  return (
    <div className="flex w-full gap-4 items-center">
      <Image
        src={category?.imgUrl}
        width={300}
        classNames={{ wrapper: "bg-gray-400  aspect-4/3" }}
      />
      <div className="w-1/2 flex flex-col">
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
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
