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

const CartSideBar = () => {
  const dispatch = useDispatch();
  const { loadingCart, userCarts, isCartOpen } = useSelector(
    (state) => state.manageCart
  );
  const { userLogin } = useContext(AuthContext);

  useEffect(() => {
    if (userLogin?.id) {
      dispatch(getUserCarts(userLogin.id));
    }
  }, [userLogin]);

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
                    radius="none"
                  />
                  <div className="w-full">
                    <p className="cursor-pointer hover:underline">{p.name}</p>
                    <span className="text-xs w-fit max-w-80 line-clamp-1">
                      {p.description}
                    </span>
                    <div className="flex gap-2 justify-between items-center mt-2">
                      <ButtonGroup className="bg-default-100">
                        <Button
                          // isLoading={loadingCart}
                          onPress={() =>
                            dispatch(
                              handleCartUpdate(userLogin.uid, p.id, "remove")
                            )
                          }
                          isIconOnly
                          aria-label="Add Cart"
                          variant="flat"
                          size="sm"
                          radius="none"
                        >
                          <FaMinus />
                        </Button>
                        <p className="px-4"> {p.quantity}</p>
                        <Button
                          isDisabled={p.stock <= p.quantity}
                          // isLoading={loadingCart}
                          onPress={() =>
                            dispatch(handleCartUpdate(userLogin.uid, p.id))
                          }
                          isIconOnly
                          aria-label="Add Cart"
                          variant="flat"
                          size="sm"
                          radius="none"
                        >
                          <FaPlus />
                        </Button>
                      </ButtonGroup>
                      <Button
                        onPress={() =>
                          dispatch(
                            handleCartUpdate(userLogin.uid, p.id, "delete")
                          )
                        }
                        radius="none"
                        color="danger"
                        variant="flat"
                        size="sm"
                        isIconOnly
                        endContent={<MdDelete className="text-lg" />}
                      />
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
