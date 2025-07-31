import { Chip, Image } from "@heroui/react";
import { currencyFormat } from "../../service/formatter";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProductsCard = ({ product, chipLabel }) => {
  return (
    <div>
      <div className="relative">
        <Link to={`product/${product.id}`}>
          <Image
            isZoomed
            radius="none"
            src={product.imgUrl}
            className="aspect-3/4 z-1 w-full cursor-pointer object-cover bg-default-100 rounded-none"
          />
        </Link>
        {chipLabel && (
          <Chip
            color="primary"
            size="sm"
            className="absolute top-3 right-3 z-1"
          >
            {chipLabel}
          </Chip>
        )}
      </div>
      <div className="mt-3 flex flex-col">
        <Link to={`product/${product.id}`}>
          <h3 className="text-sm font-light hover:underline cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-black/60 font-light">
          {currencyFormat(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductsCard;
