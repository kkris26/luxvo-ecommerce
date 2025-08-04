import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import db from "../db/db";

const ShopPage = () => {
  //   const { products, loading } = useSelector((state) => state.products);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [openFilter, setOpenFilter] = useState(false);

  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  console.log(openFilter);

  const getProductsCategories = async () => {
    setLoading(true);
    let q = collection(db, "products");
    try {
      if (filter !== "all") {
        q = query(q, where("category", "==", filter));
      }
      q = query(q, orderBy("name", sort));
      const querySnapshot = await getDocs(q);
      const reuslts = querySnapshot.docs.map((doc) => doc.data());
      setFilteredProducts(reuslts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsCategories();
  }, [filter, sort]);

  return (
    <div className="flex gap-4">
      <div className="w-1/4 h-screen  ">
        <h2>Filter</h2>
        <RadioGroup
          defaultValue="all"
          color="default"
          label="Select Category"
          onChange={(e) => setFilter(e.target.value)}
        >
          <Radio value="all">All</Radio>
          {categories.map((c) => (
            <Radio value={c.id}>{c.name}</Radio>
          ))}
        </RadioGroup>
        <RadioGroup
          color="default"
          label="Select Category"
          defaultValue="asc"
          onChange={(e) => setSort(e.target.value)}
        >
          <Radio value="asc">Low to High</Radio>
          <Radio value="desc">High to Low</Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col items-end gap-4 w-full">
        <div
          onMouseEnter={() => setOpenFilter(true)}
          onMouseLeave={() => setOpenFilter(false)}
        >
          <Dropdown
            classNames={{
              base: " -mt-2",
            }}
            isOpen={openFilter}
            onOpenChange={setOpenFilter}
          >
            <DropdownTrigger>
              <p variant="flat">Sort By : {sort}</p>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  className={item.key === "delete" ? "text-danger" : ""}
                  color={item.key === "delete" ? "danger" : "default"}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <ProductGridWrapper
          grid={4}
          loading={loading}
          products={filteredProducts}
          skeleton={12}
        />
      </div>
    </div>
  );
};

export default ShopPage;
