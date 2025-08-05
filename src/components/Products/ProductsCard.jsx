import { addToast, Button, Chip, Image } from "@heroui/react";
import { currencyFormat } from "../../service/formatter";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { handleFavorite } from "../../redux/features/favorite/favoriteSlice";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProductsCard = ({ product, chipLabel }) => {
  const dispatch = useDispatch();
  const { favoriteProduct, loadingFavorite, favorites } = useSelector(
    (state) => state.favorite
  );
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickFavorite = (productID, userID) => {
    dispatch(handleFavorite(productID, userID)).then((success) => {
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
      <div className="relative bg-default-100 ">
        <Link className="min-h-full flex" to={`/product/${product.id}`}>
          <Image
            isZoomed
            radius="none"
            src={product.imgUrl}
            className="aspect-3/4 min-h-80  z-1 w-full cursor-pointer object-cover  rounded-none"
          />
        </Link>

        {chipLabel && (
          <Chip
            color="primary"
            size="sm"
            className="absolute top-3 right-3 z-1"
          >
            {chipLabel}
          </Chip>
        )}
      </div>
      <div className="mt-3 flex flex-col">
        <div className="flex justify-between">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm pr-2  font-light hover:underline cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              !loadingFavorite &&
                handleClickFavorite(product.id, userLogin.uid);
            }}
          >
            {favorites.find((f) => f.productID === product.id) ? (
              <IoMdHeart className="text-xl font-light" />
            ) : (
              <IoMdHeartEmpty className="text-xl font-light" />
            )}
          </div>
        </div>
        <p className="text-sm text-black/60 font-light">
          {currencyFormat(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductsCard;
