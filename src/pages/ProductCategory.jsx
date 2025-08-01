import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import db from "../db/db";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import { useSelector } from "react-redux";
import { Button, Image, Skeleton } from "@heroui/react";

const ProductCategory = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );

  const categoryData = categories.find((c) => c.id === params.category);
  useEffect(() => {
    const getProductByCategory = async () => {
      setLoading(true);
      try {
        const categoryRef = collection(db, "products");
        const q = query(categoryRef, where("category", "==", params.category));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsByCategory(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductByCategory();
  }, []);
  return (
    <>
      {loadingGetCategory ? (
        <div className="relative w-full h-100 rounded-none overflow-hidden">
          <div className="absolute inset-0 bg-default-100 w-full h-full">
         
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center space-y-3">
            <Skeleton className="w-2/6 rounded-lg">
              <div className="h-8 w-2/3 bg-default-200 rounded-lg" />
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-4 w-1/2 bg-default-300 rounded-lg" />
            </Skeleton>
            <Skeleton className="w-1/6 rounded-lg">
              <div className="h-10 w-full bg-default-300 rounded-lg" />
            </Skeleton>
          </div>
        </div>
      ) : (
        <div className="h-100 relative gap-3 flex flex-col items-center justify-center text-white">
          <img
            src={categoryData?.imgUrl}
            className="absolute h-full  bg-default-500 w-full object-cover -z-1 inset-0 "
          />
          <h1 className="text-4xl tracking-wider font-extralight uppercase">
            {categoryData?.name}
          </h1>
          <p className="text-sm font-extralight">
            {" "}
            {categoryData?.description}
          </p>
          <Link to={"#content"}>
            <Button
              variant="bordered"
              color="white"
              className="border-1 mt-2"
              radius="none"
            >
              Let's Explore
            </Button>
          </Link>
        </div>
      )}
      <div className="py-20" id="content">
        <ProductGridWrapper loading={loading} products={productsByCategory} />
      </div>
    </>
  );
};

export default ProductCategory;
