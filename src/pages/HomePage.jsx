import { useSelector } from "react-redux";
import ProductsCard from "../components/Products/ProductsCard";
import CategoryCard from "../components/Products/CategoryCard";
import { useEffect, useState } from "react";
import db from "../db/db";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import HeadingTitle from "../components/Products/HeadingTitle";
import LabelTitle from "../components/Products/LabelTitle";
import { Button, Image } from "@heroui/react";
import { Link } from "react-router";
import VideoHero from "../components/Main/VideoHero";
import SectionTitle from "../components/Main/SectionTitle";
import SectionWrapper from "../components/Main/SectionWrapper";
import BannerImage from "../components/Main/BannerImage";
import ProductGrid from "../components/Main/ProductGrid";

const Homepage = () => {
  const { products, loading } = useSelector((state) => state.products);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const [orderByPrice, setOrderByPrice] = useState([]);
  const [loadingOrderPrice, setLoadingOrderPrice] = useState(true);

  useEffect(() => {
    const getShoesProducts = async () => {
      setLoadingOrderPrice(true);
      try {
        const q = query(collection(db, "products"), orderBy("price", "asc"));
        const querySnapshot = await getDocs(q);
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrderByPrice(allProducts);
        console.log("fetch shoes product");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOrderPrice(false);
      }
    };
    getShoesProducts();
  }, []);

  return (
    <>
      <VideoHero
        src="https://res.cloudinary.com/dbtathpqx/video/upload/v1752676181/video-test_zceqg9.mp4"
        poster="https://res.cloudinary.com/dbtathpqx/image/upload/v1752986683/poster-video_ghn5e3.jpg"
      />

      <SectionWrapper>
        <SectionTitle label="Category" title="Featured Categories" />
        <div className="grid grid-cols-4 gap-4 ">
          {loadingGetCategory ? (
            <p>Loading ...</p>
          ) : (
            categories.map((c) => <CategoryCard key={c.id} category={c} />)
          )}
        </div>
      </SectionWrapper>

      <BannerImage src="https://id.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Main/2025/central/collections/men-lg/Men_Bags_Shopper_Tote_2507_WW_HP_Push__DI3.jpg?wid=4096" />

      <ProductGrid
        loading={loading}
        title="New Season Picks"
        label="Our Latest"
        products={products.slice(0, 4)}
        link={"/shop"}
        chipLabel={"New"}
      />

      <BannerImage src="https://id.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Main/2025/central/collections/women-lg/WLG_EXPRESS_WW_HP_push_DI3.jpg?wid=4096" />

      <ProductGrid
        loading={loadingOrderPrice}
        title="Customer Favorites"
        label="Most Loved"
        products={orderByPrice.slice(0, 4)}
        link={"/shop"}
        chipLabel={"Best Seller"}
      />
    </>
  );
};

export default Homepage;
