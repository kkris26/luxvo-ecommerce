import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../db/db";

import { useSelector } from "react-redux";
import { Button, Image } from "@heroui/react";
import { currencyFormat } from "../service/formatter";
import ProductDetailsSkeleton from "../components/Products/ProductDetailsSekeleton";

const ProductDetails = () => {
  const { product } = useParams();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );

  const categoryData = categories.find(
    (c) => c.id === productDetails?.category
  );
  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "products", product);
        const results = await getDoc(docRef);
        console.log(results);

        setProductDetails(results.data());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, []);

  return loading ? (
    <ProductDetailsSkeleton />
  ) : (
    <div className="pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
      <div className="flex justify-center ">
        <Image
          isZoomed
          radius="none"
          src={productDetails.imgUrl}
          alt={productDetails.name}
          className="w-full aspect-square object-cover bg-default-100"
        />
      </div>

      <div className="flex flex-col justify-start space-y-6">
        <div>
          <h1 className="text-4xl">{productDetails.name}</h1>
          <p className="text-sm font-light text-gray-400 mt-2">
            Category:{" "}
            {categories.find((c) => c.id === productDetails.category)?.name}
          </p>
        </div>

        <p className="text-base text-gray-600 font-light leading-normal">
          {productDetails.description}
        </p>

        <div className="space-y-2">
          <p className="text-3xl font-light ">
            {currencyFormat(productDetails.price)}
          </p>
          <p className="text-sm font-light text-gray-500">
            Stock:{" "}
            <span
              className={` ${
                parseInt(productDetails.stock) > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {productDetails.stock}{" "}
              {parseInt(productDetails.stock) > 0
                ? "available"
                : "out of stock"}
            </span>
          </p>
        </div>

        <div className="pt-4">
          <Button
            isDisabled={parseInt(productDetails.stock) === 0}
            radius="none"
            color="primary"
            className="px-10"
          >
            {parseInt(productDetails.stock) > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
