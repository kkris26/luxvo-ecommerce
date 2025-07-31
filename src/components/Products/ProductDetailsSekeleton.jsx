import { Skeleton } from "@heroui/react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
      <div className="flex justify-center w-full">
        <Skeleton className="w-full aspect-square rounded-none bg-default-200" />
      </div>

      <div className="flex flex-col justify-start space-y-6 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4 rounded-md bg-default-200" />
          <Skeleton className="h-4 w-1/5 rounded-md bg-default-300" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md bg-default-200" />
          <Skeleton className="h-4 w-11/12 rounded-md bg-default-200" />
          <Skeleton className="h-4 w-5/6 rounded-md bg-default-200" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3 rounded-md bg-default-300" />
          <Skeleton className="h-4 w-2/5 rounded-md bg-default-300" />
        </div>

        <div className="pt-4">
          <Skeleton className="h-10 w-40 rounded-none bg-default-300" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
