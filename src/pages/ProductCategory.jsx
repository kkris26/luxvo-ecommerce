import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import db from "../db/db";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import { useSelector } from "react-redux";
import { Button, Image } from "@heroui/react";

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
      <div className="h-100 relative gap-3 flex flex-col items-center justify-center text-white">
        <img
          src={categoryData?.imgUrl}
          className="absolute h-full  bg-default-500 w-full object-cover -z-1 inset-0 "
        />
        <h1 className="text-4xl tracking-wider font-extralight uppercase">
          {categoryData?.name}
        </h1>
        <p className="text-sm font-extralight"> {categoryData?.description}</p>
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
      <div className="py-20" id="content">
        <ProductGridWrapper loading={loading} products={productsByCategory} />
      </div>
    </>
  );
};

export default ProductCategory;
