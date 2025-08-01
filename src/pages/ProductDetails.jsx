import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../db/db";

import { useDispatch, useSelector } from "react-redux";
import { Button, Image, ScrollShadow } from "@heroui/react";
import { currencyFormat } from "../service/formatter";
import ProductDetailsSkeleton from "../components/Products/ProductDetailsSekeleton";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import { getUserCarts } from "../redux/features/cart/manageCartSlice";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { userLogin } = useContext(AuthContext);
  const { product } = useParams();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const [loadingProductsCategory, setLoadingProductsCategory] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const { loadingCart, userCarts } = useSelector((state) => state.manageCart);

  const categoryData = categories.find(
    (c) => c.id === productDetails?.category
  );


  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "products", product);
        const results = await getDoc(docRef);

        setProductDetails(results.data());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [product]);

  useEffect(() => {
    const getProductByCategory = async () => {
      setLoadingProductsCategory(true);
      try {
        const categoryRef = collection(db, "products");
        const q = query(
          categoryRef,
          where("category", "==", productDetails.category)
        );
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsByCategory(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProductsCategory(false);
      }
    };
    if (productDetails.category) {
      getProductByCategory();
    }
  }, [productDetails]);

  useEffect(() => {
    if (userLogin?.uid) {
      dispatch(getUserCarts(userLogin?.uid, product));
    }
  }, [userLogin]);

  return (
    <>
      {loading ? (
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

          <div className="flex flex-col w-full justify-start space-y-6">
            <div>
              <h1 className="text-4xl">{productDetails.name}</h1>
              <p className="text-sm font-light text-gray-400 mt-2">
                Category: {categoryData?.name}
              </p>
            </div>

            <ScrollShadow hideScrollBar className="w-full max-h-50">
              <p className="text-sm text-gray-600 font-light leading-normal">
                {productDetails.description}
              </p>
            </ScrollShadow>

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
      )}
      <div className="flex flex-col gap-4 pb-20">
        <h2 className="text-2xl font-light">Related Products</h2>
        <ProductGridWrapper
          skeleton={4}
          loading={loadingGetCategory}
          products={productsByCategory.filter((pc) => pc.id !== product)}
        />
      </div>
    </>
  );
};

export default ProductDetails;
