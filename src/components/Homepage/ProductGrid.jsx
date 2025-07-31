import { Link } from "react-router";
import ProductsCard from "../Products/ProductsCard";
import SectionTitle from "./SectionTitle";
import { Button } from "@heroui/react";

const ProductGrid = ({ label, title, products, loading, link, chipLabel }) => (
  <div className="flex flex-col gap-15 py-20 items-center">
    <SectionTitle label={label} title={title} />
    <div className="grid grid-cols-4 gap-5 w-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((p) => (
          <ProductsCard key={p.id} product={p} chipLabel={chipLabel} />
        ))
      )}
    </div>

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
