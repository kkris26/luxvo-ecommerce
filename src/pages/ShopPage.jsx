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
import Test from "./Tes";

const ShopPage = () => {
  //   const { products, loading } = useSelector((state) => state.products);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [field, setField] = useState("name");
  const [selectKey, setSelectKey] = useState("name-asc");
  const [selectLabel, setSelectLabel] = useState("Name: Z → A");
  const [openFilter, setOpenFilter] = useState(false);

  const sortItems = [
    { key: "name-asc", label: "Name: A → Z", field: "name", direction: "asc" },
    {
      key: "name-desc",
      label: "Name: Z → A",
      field: "name",
      direction: "desc",
    },
    {
      key: "price-asc",
      label: "Price: Low to High",
      field: "price",
      direction: "asc",
    },
    {
      key: "price-desc",
      label: "Price: High to Low",
      field: "price",
      direction: "desc",
    },
  ];

  const getProductsCategories = async () => {
    setLoading(true);
    let q = collection(db, "products");
    try {
      if (filter !== "all") {
        q = query(q, where("category", "==", filter));
      }
      q = query(q, orderBy(field, sort));
      const querySnapshot = await getDocs(q);
      const reuslts = querySnapshot.docs.map((doc) => doc.data());
      setFilteredProducts(reuslts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(sort, field);
  useEffect(() => {
    getProductsCategories();
  }, [filter, sort, field]);

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
            <Radio value={c.id} key={c.id}>
              {c.name}
            </Radio>
          ))}
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
              <p className="text-xs" variant="flat">
                Sort By : {selectLabel}
              </p>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={[selectKey]}
              selectionMode="single"
              aria-label="Dynamic Actions"
            >
              {sortItems.map((item) => (
                <DropdownItem
                  itemClasses={{
                    title:"text-xs"
                  }}
                  className="text-xs"
                  key={item.key}
                  value={item.field}
                  onClick={() => {
                    setField(item.field),
                      setSort(item.direction),
                      setSelectKey(item.key),
                      setSelectLabel(item.label);
                  }}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <ProductGridWrapper
          grid={4}
          loading={loading}
          products={filteredProducts}
          skeleton={12}
        />
        <Test />
      </div>
    </div>
  );
};

export default ShopPage;
