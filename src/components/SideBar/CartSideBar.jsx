import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  User,
  ButtonGroup,
  DrawerFooter,
} from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { Card, CardFooter, Image, Button } from "@heroui/react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCarts,
  handleCartUpdate,
  setCartOpen,
  setOpenModalCart,
  setProductToRemove,
} from "../../redux/features/cart/manageCartSlice";
import { AuthContext } from "../../context/AuthContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import ModalWarningCart from "../Main/ModalWarningCart";

const CartSideBar = () => {
  const dispatch = useDispatch();
  const { loadingCart, userCarts, isCartOpen, loadingUpdateCart } = useSelector(
    (state) => state.manageCart
  );
  const { userLogin } = useContext(AuthContext);

  return (
    <>
      <Drawer
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
            exit: {
              opacity: 0,
              x: 100,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
          },
          initial: "exit",
          animate: "enter",
          exit: "exit",
        }}
        classNames={{
          base: "sm:data-[placement=right]:m-2 rounded-none sm:rounded-md",
        }}
        backdrop="blur"
        isOpen={isCartOpen}
        onOpenChange={() => dispatch(setCartOpen(false))}
      >
        <DrawerContent>
          <>
            <DrawerBody className="py-6">
              {userCarts.length === 0 ? (
                <div className=" text-center h-full flex flex-col justify-center">
                  <p className="text-base font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">
                    Looks like you haven’t added anything yet.
                  </p>
                </div>
              ) : (
                userCarts.map((p) => (
                  <div className="flex gap-3 items-center" key={p.id}>
                    <Image
                      src={p.imgUrl}
                      className="w-30 bg-default-100 aspect-square object-cover"
                    />
                    <div className="w-full">
                      <Link
                        to={`/product/${p.id}`}
                        onClick={() => dispatch(setCartOpen(false))}
                      >
                        <h4 className="cursor-pointer text-base hover:underline">
                          {p.name}
                        </h4>
                      </Link>

                      <div className="flex gap-2 justify-between items-end mt-2">
                        <ButtonGroup
                          size="sm"
                          className="bg-default-100 rounded-md"
                        >
                          <Button
                            onPress={() =>
                              !loadingCart &&
                              dispatch(
                                handleCartUpdate(
                                  userLogin.uid,
                                  p.id,
                                  "remove",
                                  p.name
                                )
                              )
                            }
                            isIconOnly
                            aria-label="Remove One"
                            variant="flat"
                            size="sm"
                            isLoading={loadingUpdateCart?.id === p.id}
                          >
                            <FaMinus />
                          </Button>
                          <p className="px-4">{p.quantity}</p>
                          <Button
                            isDisabled={p.stock <= p.quantity}
                            isLoading={loadingUpdateCart?.id === p.id}
                            onPress={() =>
                              dispatch(handleCartUpdate(userLogin.uid, p.id))
                            }
                            isIconOnly
                            aria-label="Add One"
                            variant="flat"
                            size="sm"
                          >
                            <FaPlus />
                          </Button>
                        </ButtonGroup>

                        <p
                          onClick={() => {
                            dispatch(
                              setProductToRemove({
                                userID: userLogin.uid,
                                productID: p.id,
                                productName: p.name,
                              })
                            );
                            dispatch(setOpenModalCart(true));
                          }}
                          className="text-xs cursor-pointer text-danger-300 hover:text-danger"
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </DrawerBody>
            {userCarts.length !== 0 && (
              <DrawerFooter>
                <Button className="w-full" color="primary">
                  Check Out
                </Button>
              </DrawerFooter>
            )}
          </>
        </DrawerContent>
      </Drawer>
      <ModalWarningCart />
    </>
  );
};

export default CartSideBar;
