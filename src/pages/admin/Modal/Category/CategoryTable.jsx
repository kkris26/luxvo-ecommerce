import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import { RiArrowDropDownLine } from "react-icons/ri";
import {
  setCategory,
  setCategoryToDelete,
  setMode,
  setOpenModal,
} from "../../../../redux/features/category/manageCategorySlice";

export const productColumns = [
  { name: "Category Name", uid: "name", sortable: true },
  { name: "Count", uid: "count" },
  { name: "Actions", uid: "actions" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const INITIAL_VISIBLE_COLUMNS = ["name", "count", "actions"];

export default function CategoryTable() {
  const dispatch = useDispatch();
  const { categories, loadingGetCategory } = useSelector(
    (state) => state.manageCategory
  );
  const { products, loading } = useSelector((state) => state.products);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return productColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...categories];

    if (hasSearchFilter) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [filterValue, categoryFilter, categories]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const cmp = (() => {
        const firstVal = a[sortDescriptor.column];
        const secondVal = b[sortDescriptor.column];

        if (typeof firstVal === "string" && typeof secondVal === "string") {
          return firstVal.localeCompare(secondVal, undefined, {
            sensitivity: "base",
          });
        }
      })();
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = (category, columnKey) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: category.imgUrl,
              classNames: {
                base: "hidden sm:block bg-default-100",
              },
            }}
            description={category.description}
            name={
              <span
                onClick={() => {
                  dispatch(setOpenModal(true));
                  dispatch(setMode("view")), dispatch(setCategory(category));
                }}
                className="cursor-pointer hover:underline"
              >
                {cellValue}
              </span>
            }
            classNames={{
              description: "text-xs w-fit max-w-80 line-clamp-1",
            }}
          ></User>
        );
      case "count":
        const count = products.filter((p) => p.category === category.id);
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {count.length}
          </Chip>
        );

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onPress={() => {
                    dispatch(setOpenModal(true)),
                      dispatch(setMode("view")),
                      dispatch(setCategory(category));
                  }}
                  key="view"
                >
                  View
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    dispatch(setOpenModal(true)), dispatch(setMode("edit"));
                    dispatch(setCategory(category));
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  key="delete"
                  onPress={() => {
                    dispatch(
                      setCategoryToDelete({
                        id: category.id,
                        name: category.name,
                      })
                    ),
                      dispatch(setOpenModal(true));
                    dispatch(setMode("delete"));
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(e.target.value);
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            variant="underlined"
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {productColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={() => {
                dispatch(setOpenModal(true));
                dispatch(setMode("add"));
              }}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-default-400 text-small">
            Showing {filteredItems.length} of {categories.length} categories
          </div>

          <div className="relative inline-block">
            <label
              htmlFor="rowsPerPage"
              className="text-sm text-default-500 mr-2"
            >
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              defaultValue={rowsPerPage}
              className="appearance-none pl-3 pr-6 py-1 rounded-md border border-default-200 bg-white text-sm text-default-700 focus:outline-none focus:ring-1 focus:ring-primary"
              onChange={onRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <RiArrowDropDownLine className=" text-2xl pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,

    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    hasSearchFilter,
    categoryFilter,
    categories.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center sm:justify-between items-center ">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <Pagination
          isCompact
          showControls
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      fullWidth
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "h-[calc(100%-70px)] ",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          loadingGetCategory || loading ? (
            <Spinner variant="dots" />
          ) : (
            "No Products found"
          )
        }
        items={sortedItems}
      >
        {(item) =>
          !loadingGetCategory &&
          !loading && (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}
