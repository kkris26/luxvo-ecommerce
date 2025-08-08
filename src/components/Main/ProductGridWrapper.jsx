import React from "react";
import ProductsCard from "../Products/ProductsCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const ProductGridWrapper = ({
  loading,
  products,
  chipLabel,
  skeleton = 8,
  grid = 4,
  variant,
}) => {
  return (
    <div
      className={`grid gap-y-8 gap-x-4 w-full ${
        grid === 1
          ? "grid-cols-1"
          : grid === 2
          ? "grid-cols-2"
          : grid === 3
          ? "grid-cols-3"
          : grid === 5
          ? "grid-cols-5"
          : "sm:grid-cols-4 grid-cols-2"
      }`}
    >
      {loading ? (
        [...Array(skeleton)].map((_, i) => <ProductCardSkeleton key={i} />)
      ) : products.length ? (
        products.map((p) => (
          <ProductsCard
            variant={variant}
            key={p.id}
            product={p}
            chipLabel={chipLabel}
          />
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
          {variant === "cart" ? (
            <>
              <h3 className="text-xl font-medium">Your cart is empty</h3>
              <p className="text-sm mt-1">
                Looks like you haven’t added anything yet.
              </p>
            </>
          ) : variant === "favorite" ? (
            <>
              <h3 className="text-xl font-medium">No favorite products yet</h3>
              <p className="text-sm mt-1">
                Mark products you like so you can find them more easily later.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-sm mt-1">
                Try adjusting your filters or explore a different category.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGridWrapper;
