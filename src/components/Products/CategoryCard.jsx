import { Image } from "@heroui/react";

const CategoryCard = ({ category }) => {
  return (
    <div>
      <Image
        isZoomed
        radius="none"
        src={category.imgUrl}
        className="aspect-square w-full bg-default-100 object-cover rounded-none"
      />
      <div className="mt-3 flex flex-col">
        <h3 className="text-base font-light text-center">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
