import { Card, Skeleton } from "@heroui/react";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className=" space-y-4" radius="none">
      <Skeleton>
        <div className="w-full h-auto aspect-3/4 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
