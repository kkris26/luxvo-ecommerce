import { Button } from "@heroui/react";
import ModalWarningCart from "../../components/Main/ModalWarningCart";
import ProductGridWrapper from "../../components/Main/ProductGridWrapper";
import { useSelector } from "react-redux";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const CartPage = () => {
  const { loadingCart, userCarts, isCartOpen, loadingUpdateCart } = useSelector(
    (state) => state.manageCart
  );

  return (
    <div className="flex flex-col items-end justify-between min-h-full">
      <ProductGridWrapper
        variant={"cart"}
        loading={loadingCart}
        products={userCarts}
      />
      {userCarts.length > 0 && (
        <Button
          endContent={<MdOutlineShoppingCartCheckout />}
          color="primary"
          className="mt-6 w-full sm:w-max"
        >
          Checkout
        </Button>
      )}
      <ModalWarningCart />
    </div>
  );
};

export default CartPage;
