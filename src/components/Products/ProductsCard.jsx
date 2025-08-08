import { addToast, Button, ButtonGroup, Chip, Image } from "@heroui/react";
import { currencyFormat } from "../../service/formatter";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaMinus, FaPlus, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
  handleFavorite,
  setFavoriteToRemove,
  setOpenModalFavorite,
} from "../../redux/features/favorite/favoriteSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  handleCartUpdate,
  setOpenModalCart,
  setProductToRemove,
} from "../../redux/features/cart/manageCartSlice";

const ProductsCard = ({ product, chipLabel, variant }) => {
  const dispatch = useDispatch();
  const { favoriteProduct, loadingFavorite, favorites } = useSelector(
    (state) => state.favorite
  );
  const { loadingCart, userCarts, isCartOpen, loadingUpdateCart } = useSelector(
    (state) => state.manageCart
  );
  const { userLogin, loadUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickFavorite = (productID) => {
    if (!userLogin) {
      return navigate("?auth=signin");
    }
    dispatch(handleFavorite(productID, userLogin.uid)).then((success) => {
      if (success) {
        addToast({
          title: "Added to Favorites",
          color: "success",
          endContent: (
            <Button
              size="sm"
              variant="flat"
              color="success"
              onPress={() => navigate("/user/favorite")}
            >
              View
            </Button>
          ),
        });
      }
    });
  };

  return (
    <div className=" flex flex-col">
      <div className="relative w-full bg-default-100 ">
        <Link className="min-h-full w-full flex" to={`/product/${product.id}`}>
          <Image
            isZoomed
            radius="none"
            src={product.imgUrl}
            className="aspect-3/4  z-1 w-full cursor-pointer object-cover  rounded-none"
          />
        </Link>
        {variant === "cart" && (
          <ButtonGroup
            size="sm"
            className="shadow  absolute bg-white bottom-3 translate-x-1/2 right-1/2  z-1 rounded-md"
          >
            <Button
              onPress={() =>
                !loadingCart &&
                dispatch(
                  handleCartUpdate(
                    userLogin.uid,
                    product.id,
                    "remove",
                    product.name
                  )
                )
              }
              isIconOnly
              aria-label="Remove One"
              variant="flat"
              size="sm"
              isLoading={loadingUpdateCart?.id === product.id}
            >
              <FaMinus />
            </Button>
            <p className="px-4">{product.quantity}</p>
            <Button
              isDisabled={product.stock <= product.quantity}
              isLoading={loadingUpdateCart?.id === product.id}
              onPress={() =>
                dispatch(handleCartUpdate(userLogin.uid, product.id))
              }
              isIconOnly
              aria-label="Add One"
              variant="flat"
              size="sm"
            >
              <FaPlus />
            </Button>
          </ButtonGroup>
        )}

        {(chipLabel || variant === "cart") && (
          <Chip
            color="primary"
            size="sm"
            className="absolute top-3 right-3 z-1"
          >
            {chipLabel || product.quantity}
          </Chip>
        )}
      </div>
      <div className="mt-3 flex flex-col">
        <div className="flex justify-between">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xs sm:text-sm pr-2  font-light hover:underline cursor-pointer">
              {product.name}
            </h3>
          </Link>
          {variant === "cart" ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  setProductToRemove({
                    userID: userLogin.uid,
                    productID: product.id,
                    productName: product.name,
                  })
                );
                dispatch(setOpenModalCart(true));
              }}
            >
              <FaTrashAlt className="text-danger" />
            </div>
          ) : (
            <div className="cursor-pointer">
              {favorites.find((f) => f.productID === product.id) ? (
                <IoMdHeart
                  onClick={() => {
                    if (variant === "favorite") {
                      dispatch(
                        setFavoriteToRemove({
                          userID: userLogin.uid,
                          productID: product.id,
                          productName: product.name,
                        })
                      );
                      dispatch(setOpenModalFavorite(true));
                    } else {
                      !loadingFavorite && handleClickFavorite(product.id);
                    }
                  }}
                  className="text-xl font-light"
                />
              ) : (
                <IoMdHeartEmpty
                  onClick={() => {
                    !loadingFavorite && handleClickFavorite(product.id);
                  }}
                  className="text-xl font-light"
                />
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-black/60 font-light">
          {currencyFormat(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductsCard;
