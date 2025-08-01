import { useEffect } from "react";
import ProductsTable from "../../components/Table/ProductsTable";
import ModalProductDash from "../../components/Modal/ModalProductDash";
import { ConfirmDelete } from "../admin/Modal/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/store/product/productSlice";
import {
  setMode,
  setOpenModal,
  setProductToDelete,
  setSelectedProduct,
} from "../../redux/store/product/manageProductSlice";
import ViewProduct from "./Modal/ViewProduct";
import HandleProduct from "./Modal/HandleProduct";
import WarningCloseModal from "./Modal/WarningCloseModal";
import { getAllCategories } from "../../redux/features/category/manageCategorySlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { openModal, mode, productToDelete, safeToClose } = useSelector(
    (state) => state.manageProduct
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (openModal === false) {
      setTimeout(() => {
        dispatch(setSelectedProduct(null));
        dispatch(setProductToDelete(null));
        dispatch(setMode(null));
      }, 300);
    }
  }, [openModal]);

  return (
    <>
      <h1 className="text-2xl mb-8">All Products</h1>
      <ProductsTable />
      <ModalProductDash size={productToDelete || !safeToClose ? "md" : "4xl"}>
        {!safeToClose ? (
          <WarningCloseModal />
        ) : productToDelete ? (
          <ConfirmDelete />
        ) : (
          <>
            {mode === "add" && <HandleProduct />}
            {mode === "edit" && <HandleProduct />}
            {mode === "view" && <ViewProduct />}
          </>
        )}
      </ModalProductDash>
    </>
  );
};

export default ProductsPage;
