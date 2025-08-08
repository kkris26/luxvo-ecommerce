import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGridWrapper from "../components/Main/ProductGridWrapper";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Radio,
  RadioGroup,
} from "@heroui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import db from "../db/db";
import { useSearchParams } from "react-router";
import { setQuery, setSearchQuery } from "../redux/features/search/searchSlice";
import CategoryFilterSidebar from "../components/Filter/CategoryFilterSidebar";
import { VscSettings } from "react-icons/vsc";

const ShopPage = () => {
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("c") || "all");
  const [sort, setSort] = useState("asc");
  const [field, setField] = useState("name");
  const [selectKey, setSelectKey] = useState("name-asc");
  const [selectLabel, setSelectLabel] = useState("Name: Z → A");
  // pagination --
  const [totalPage, setTotalPage] = useState(0);
  const [initialPage, setInitialPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  // -------------
  const [openFilter, setOpenFilter] = useState(false);
  const [openModalFilter, setModalFilter] = useState(false);
  const { searchQuery, openSearch } = useSelector((state) => state.search);

  const dispatch = useDispatch();

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
  const PAGE_LIMIT = 8; // SNAKE_CASE => READ ONLY

  // pagination --
  function handlePrevPage() {
    if (initialPage > 1) {
      setInitialPage((prevState) => prevState - 1);
    }
  }
  function handleNextPage() {
    if (initialPage < totalPage) {
      setInitialPage((prevState) => prevState + 1);
    }
  }
  // -------------

  const getProductsCategories = async () => {
    setLoading(true);
    let q = collection(db, "products");
    try {
      if (filter !== "all") {
        q = query(q, where("category", "==", filter));
      }
      if (searchQuery) {
        q = query(q, where("name", "==", searchQuery));
      }
      q = query(q, orderBy(field, sort));
      // setup pagination
      const totalItems = (await getDocs(q)).size;

      setTotalItems(totalItems);
      const currentTotalPage = Math.ceil(totalItems / PAGE_LIMIT);
      setTotalPage(currentTotalPage);
      if (initialPage > currentTotalPage) {
        setInitialPage(1);
      }
      q = query(q, limit(PAGE_LIMIT)); // currentPage = 1 => limit = 2
      if (initialPage > 1) {
        q = query(q, limit((initialPage - 1) * PAGE_LIMIT));
        // currentPage = 2 => limit = 2 => Kacamata Keren => indeks ke-1
        // currentPage = 3 => limit = 4 => Bayi Rubah => indeks ke-3
        const documentSnapshots = await getDocs(q);
        const lastVisible = documentSnapshots.docs.at(-1); // documentSnapshots.docs[documentSnapshots.docs.length - 1]
        q = query(q, limit(PAGE_LIMIT), startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const reuslts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFilteredProducts(reuslts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductsCategories();
    setSearchParams(`?c=${filter}`);
  }, [filter, sort, field, initialPage, searchQuery]);

  return (
    <div className="flex gap-4">
      <div className="w-1/6 hidden sm:flex h-full flex-col gap-5 sticky top-20  ">
        <CategoryFilterSidebar
          filter={filter}
          setFilter={setFilter}
          categories={categories}
        />
      </div>
      <div className="flex flex-col items-end gap-4 w-full">
        <div className="flex  w-full justify-between">
          <div className="flex gap-1 items-center">
            <VscSettings className="text-lg sm:hidden block" onClick={() => setModalFilter(true)} />
            <p className="text-xs sm:text-sm">
              Showing {totalItems} products{" "}
              {searchQuery && `result for  '${searchQuery}'`}
            </p>
          </div>
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
                      title: "text-xs",
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
        </div>
        <ProductGridWrapper
          grid={4}
          loading={loading}
          products={filteredProducts}
          skeleton={4}
        />
        {totalItems > 0 && (
          <div className="flex gap-4 mt-5 w-full justify-center">
            <Pagination
              // isCompact
              classNames={{
                next: "cursor-pointer",
                prev: "cursor-pointer",
              }}
              color="primary"
              showControls
              siblings={0}
              onChange={setInitialPage}
              total={totalPage}
              page={initialPage}
            />
          </div>
        )}
      </div>
      <Modal isOpen={openModalFilter} onOpenChange={setModalFilter}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-4">
                <CategoryFilterSidebar
                  filter={filter}
                  setFilter={setFilter}
                  categories={categories}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShopPage;
