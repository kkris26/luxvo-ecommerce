import { Skeleton } from "@heroui/react";

const CategoryCardSkeleton = () => {
  return (
    <div className="space-y-4" radius="none">
      <Skeleton>
        <div className="w-full aspect-square rounded-none bg-default-300" />
      </Skeleton>
      <div className="flex justify-center">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
