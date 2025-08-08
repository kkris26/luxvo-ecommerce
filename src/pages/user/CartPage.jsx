import ProductGridWrapper from "../../components/Main/ProductGridWrapper";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { loadingCart, userCarts, isCartOpen, loadingUpdateCart } = useSelector(
    (state) => state.manageCart
  );

  return (
    <div className="">
      {/* <h1 className="text-2xl">Your Cart</h1> */}
      <ProductGridWrapper loading={loadingCart} products={userCarts} grid={5} />
    </div>
  );
};

export default CartPage;
