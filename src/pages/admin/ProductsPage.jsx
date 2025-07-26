import { useEffect } from "react";
import ProductsTable from "../../components/Table/ProductsTable";
import ModalProductDash from "../../components/Modal/ModalProductDash";
import AddProduct from "../admin/Modal/AddProduct";
import { ConfirmDelete } from "../admin/Modal/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/store/product/productSlice";
import {
  setProductToDelete,
  setSelectedProduct,
} from "../../redux/store/product/manageProductSlice";
import ViewProduct from "./Modal/ViewProduct";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { openModal, isAddProduct, productToDelete, selectedProduct } =
    useSelector((state) => state.manageProduct);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (openModal === false) {
      setTimeout(() => {
        dispatch(setSelectedProduct(null));
        dispatch(setProductToDelete(null));
      }, 300);
    }
  }, [openModal]);


  return (
    <>
      <h1 className="text-2xl mb-8">All Products</h1>
      <ProductsTable />
      <ModalProductDash size={productToDelete ? "md" : "4xl"}>
        {productToDelete ? (
          <ConfirmDelete />
        ) : isAddProduct ? (
          <AddProduct />
        ) : (
          selectedProduct && <ViewProduct />
        )}
      </ModalProductDash>
    </>
  );
};

export default ProductsPage;
