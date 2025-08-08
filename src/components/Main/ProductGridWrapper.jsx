import React from "react";
import ProductsCard from "../Products/ProductsCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const ProductGridWrapper = ({
  loading,
  products,
  chipLabel,
  skeleton = 8,
  grid = 4,
}) => {
  return (
    <div
      className={`grid gap-y-8 gap-x-5 w-full ${
        grid === 1
          ? "grid-cols-1"
          : grid === 2
          ? "grid-cols-2"
          : grid === 3
          ? "grid-cols-3"
          : "grid-cols-4"
      }`}
    >
      {loading ? (
        [...Array(skeleton)].map((_, i) => <ProductCardSkeleton key={i} />)
      ) : products.length ? (
        products.map((p) => (
          <ProductsCard key={p.id} product={p} chipLabel={chipLabel} />
        ))
      ) : (
        <div
          className={`h-50 flex items-center justify-center flex-col gap-1 place-items-center ${
            grid === 1
              ? "col-span-1"
              : grid === 2
              ? "col-span-2"
              : grid === 3
              ? "col-span-3"
              : "col-span-4"
          }`}
        >
          <h3 className="text-xl">No Products Found</h3>
          <p className="text-sm font-light text-gray-500">
            Try adjusting your filters or browse a different category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGridWrapper;
