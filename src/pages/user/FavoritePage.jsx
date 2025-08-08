import { useSelector } from "react-redux";
import ProductGridWrapper from "../../components/Main/ProductGridWrapper";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../db/db";
import ModalWarningFav from "../../components/Main/ModalWarningFav";

const FavoritePage = () => {
  const { loadingFavorite, favorites } = useSelector((state) => state.favorite);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavoriteProducts = async (favorites) => {
    setLoading(true);
    try {
      const promises = favorites.map(async (fav) => {
        const docRef = doc(db, "products", fav.productID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      });

      const results = await Promise.all(promises);
      setFavoriteProducts(results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      getFavoriteProducts(favorites);
    } else {
      setFavoriteProducts([]);
    }
  }, [favorites]);

  return (
    <div>
      <ProductGridWrapper
        variant={"favorite"}
        loading={loading}
        products={favoriteProducts}
      />
      <ModalWarningFav />
    </div>
  );
};

export default FavoritePage;
