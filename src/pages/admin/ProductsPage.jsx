import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import db from "../../db/db";
import { useEffect, useState } from "react";
import ProductsTable from "../../components/Table/ProductsTable";
import ModalProductDash from "../../components/Modal/ModalProductDash";
import EditProduct from "../admin/Modal/EditProduct";
import AddProduct from "../admin/Modal/AddProduct";
import { ConfirmDelete } from "../admin/Modal/ConfirmDelete";
import { addToast } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/store/product/productSlice";

const ProductsPage = () => {

  const [openModal, setOpenModal] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);
  const [productsToDelete, setProductsToDelete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (openModal === false) {
      setSelectedProduct(null);
      setTimeout(() => {
        setProductsToDelete(null);
      }, 200);
    }
  }, [openModal]);

  const confirmDelete = () => {
    setOpenModal(true);
  };
  const handleDeleteProducts = async (productsId) => {
    await deleteDoc(doc(db, "products", productsId));
    setProductsToDelete(null);
    getProducts();
    addToast({
      title: "Succesfully",
      description: "Delete Product Succesfully",
      timeout: 3000,
      size: "sm",
      color: "success",
      radius: "sm",
      shouldShowTimeoutProgress: true,
    });
  };

  return (
    <>
      <h1 className="text-2xl mb-8">All Products</h1>
      <ProductsTable
        loading={loading}
        products={products}
        setOpenModal={setOpenModal}
        setSelectedProduct={setSelectedProduct}
        setAddProduct={setAddProduct}
        handleDeleteProducts={handleDeleteProducts}
        setProductsToDelete={setProductsToDelete}
        confirmDelete={confirmDelete}
      />
      <ModalProductDash
        isOpen={openModal}
        onOpenChange={setOpenModal}
        size={productsToDelete ? "md" : "4xl"}
        setAddProduct={setAddProduct}
      >
        {productsToDelete ? (
          <ConfirmDelete
            productToDelete={productsToDelete}
            setOpenModal={setOpenModal}
            handleDeleteProducts={handleDeleteProducts}
          />
        ) : isAddProduct ? (
          <AddProduct getProducts={getProducts} setLoading={setLoading} />
        ) : (
          <EditProduct selectedProduct={selectedProduct} />
        )}
      </ModalProductDash>
    </>
  );
};

export default ProductsPage;
