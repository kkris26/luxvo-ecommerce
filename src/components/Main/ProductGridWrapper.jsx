import React from "react";
import ProductsCard from "../Products/ProductsCard";

const ProductGridWrapper = ({ loading, products, chipLabel }) => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((p) => (
          <ProductsCard key={p.id} product={p} chipLabel={chipLabel} />
        ))
      )}
    </div>
  );
};

export default ProductGridWrapper;
