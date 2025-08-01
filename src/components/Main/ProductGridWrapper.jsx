import React from "react";
import ProductsCard from "../Products/ProductsCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const ProductGridWrapper = ({ loading, products, chipLabel, skeleton = 8 }) => {
  return (
    <div className="grid grid-cols-4 gap-y-8 gap-x-5 w-full">
      {loading ? (
        [...Array(skeleton)].map((_, i) => <ProductCardSkeleton key={i} />)
      ) : products.length > 0 ? (
        products.map((p) => (
          <ProductsCard key={p.id} product={p} chipLabel={chipLabel} />
        ))
      ) : (
        <div className="col-span-4 h-200  flex items-center justify-center flex-col gap-1 place-items-center">
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
