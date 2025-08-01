import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  User,
  ButtonGroup,
} from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { Card, CardFooter, Image, Button } from "@heroui/react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCarts,
  handleCartUpdate,
  setCartOpen,
} from "../../redux/features/cart/manageCartSlice";
import { AuthContext } from "../../context/AuthContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router";

const CartSideBar = () => {
  const dispatch = useDispatch();
  const { loadingCart, userCarts, isCartOpen } = useSelector(
    (state) => state.manageCart
  );
  const { userLogin } = useContext(AuthContext);


  return (
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
        {(onCLose) => (
          <>
            <DrawerHeader>
              <h2 className="font-bold">Cart Item</h2>
            </DrawerHeader>
            <DrawerBody>
              {userCarts.map((p) => (
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
                      <h4 className="cursor-pointer text-lg hover:underline">
                        {p.name}
                      </h4>
                    </Link>
                    {/* <span className="text-xs w-fit max-w-80 line-clamp-1">
                      {p.description}
                    </span> */}
                    <div className="flex gap-2  justify-between items-end mt-2">
                      <ButtonGroup className="bg-default-100 rounded-md">
                        <Button
                          onPress={() =>
                            dispatch(
                              handleCartUpdate(userLogin.uid, p.id, "remove")
                            )
                          }
                          isIconOnly
                          aria-label="Add Cart"
                          variant="flat"
                          size="sm"
                        >
                          <FaMinus />
                        </Button>
                        <p className="px-4"> {p.quantity}</p>
                        <Button
                          isDisabled={p.stock <= p.quantity}
                          onPress={() =>
                            dispatch(handleCartUpdate(userLogin.uid, p.id))
                          }
                          isIconOnly
                          aria-label="Add Cart"
                          variant="flat"
                          size="sm"
                        >
                          <FaPlus />
                        </Button>
                      </ButtonGroup>

                      <p
                        onClick={() =>
                          dispatch(
                            handleCartUpdate(userLogin.uid, p.id, "delete")
                          )
                        }
                        className="text-xs cursor-pointer text-danger-300 hover:text-danger"
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartSideBar;
