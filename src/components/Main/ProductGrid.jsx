import { Link } from "react-router";
import SectionTitle from "./SectionTitle";
import { Button } from "@heroui/react";
import ProductGridWrapper from "./ProductGridWrapper";

const ProductGrid = ({ label, title, products, loading, link, chipLabel }) => (
  <div className="flex flex-col pt-12 gap-7 sm:gap-15 sm:pt-20 items-center">
    <SectionTitle label={label} title={title} />
    <ProductGridWrapper
      loading={loading}
      products={products}
      chipLabel={chipLabel}
    />
    <Button
      color="black"
      className="w-max border-1 hover:underline font-light"
      radius="none"
      size="md"
      variant="bordered"
    >
      <Link to={link}>Discover the Selection</Link>
    </Button>
  </div>
);

export default ProductGrid;
