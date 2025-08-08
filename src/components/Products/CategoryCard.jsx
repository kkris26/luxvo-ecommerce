import { Image } from "@heroui/react";
import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  return (
    <div className="flex flex-col h-full">
      <Link
        className="h-full  bg-default-100"
        to={`/categories/${category.id}`}
      >
        <Image
          isZoomed
          radius="none"
          src={category.imgUrl}
          className="aspect-square w-full object-cover rounded-none"
        />
      </Link>
      <div className="mt-1.5 sm:mt-3 flex flex-col">
        <h3 className="text-[13px] sm:text-base font-light text-center">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
