import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../../db/db";

const ProductCategory = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState([]);

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
  console.log(params.category);
  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <ul>
            {productsByCategory.length ? (
              productsByCategory.map((p) => <li>{p.name}</li>)
            ) : (
              <p>Not Found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
