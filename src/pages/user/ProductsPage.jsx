import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../../db/db";
import { useEffect, useState } from "react";
import ProductsTable from "../../components/Table/ProductsTable";
import ModalProductDash from "../../components/Modal/ModalProductDash";
import EditProduct from "../admin/Modal/EditProduct";
import AddProduct from "../admin/Modal/AddProduct";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (openModal === false) {
      setSelectedProduct(null);
    }
  }, [openModal]);

  return (
    <>
      <h1 className="text-2xl mb-8">All Products</h1>
      <ProductsTable
        loading={loading}
        products={products}
        setOpenModal={setOpenModal}
        setSelectedProduct={setSelectedProduct}
        setAddProduct={setAddProduct}
      />
      <ModalProductDash
        isOpen={openModal}
        onOpenChange={setOpenModal}
        size="4xl"
        setAddProduct={setAddProduct}
      >
        {isAddProduct ? (
          <AddProduct getProducts={getProducts} setLoading={setLoading} />
        ) : (
          <EditProduct selectedProduct={selectedProduct} />
        )}
      </ModalProductDash>
    </>
  );
};

export default ProductsPage;
