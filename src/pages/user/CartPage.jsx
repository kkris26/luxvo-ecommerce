import { Button } from "@heroui/react";
import ModalWarningCart from "../../components/Main/ModalWarningCart";
import ProductGridWrapper from "../../components/Main/ProductGridWrapper";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { loadingCart, userCarts, isCartOpen, loadingUpdateCart } = useSelector(
    (state) => state.manageCart
  );

  console.log(userCarts);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <ProductGridWrapper
        variant={"cart"}
        loading={loadingCart}
        products={userCarts}

      />
      <Button color="primary" className="mt-6">Checkout</Button>
      <ModalWarningCart />
    </div>
  );
};

export default CartPage;
