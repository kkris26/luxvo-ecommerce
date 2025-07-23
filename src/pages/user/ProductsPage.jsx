import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../../db/db";
import { useEffect, useState } from "react";
import ProductsTable from "../../components/Table/ProductsTable";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-8">All Products</h1>
      <ProductsTable loading={loading} products={products} />
    </>
  );
};

export default ProductsPage;
