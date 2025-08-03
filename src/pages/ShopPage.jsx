import React from "react";
import { useSelector } from "react-redux";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import { Radio, RadioGroup } from "@heroui/react";

const ShopPage = () => {
  const { products, loading } = useSelector((state) => state.products);
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  console.log(categories);
  return (
    <div className="flex gap-4">
      <div className="w-1/4 h-screen ">
        <h2>Filter</h2>
        <RadioGroup
          defaultValue="all"
        //   defaultChecked="all"
          color="default"
          label="Select Category"
        >
          <Radio value="all">All</Radio>
          {categories.map((c) => (
            <Radio value={c.id}>{c.name}</Radio>
          ))}
        </RadioGroup>
        <RadioGroup color="default" label="Select Category">
          <Radio value="asc">Low to High</Radio>
          <Radio value="desc">High to Low</Radio>
        </RadioGroup>
      </div>
      <ProductGridWrapper
        grid={4}
        loading={loading}
        products={products}
        skeleton={12}
      />
    </div>
  );
};

export default ShopPage;
