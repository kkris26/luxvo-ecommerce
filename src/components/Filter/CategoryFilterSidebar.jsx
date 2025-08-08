import { useDispatch } from "react-redux";
import {
  setQuery,
  setSearchQuery,
} from "../../redux/features/search/searchSlice";
import { Button, Radio, RadioGroup } from "@heroui/react";

const CategoryFilterSidebar = ({ filter, setFilter, categories }) => {
  const dispatch = useDispatch();

  const handleClear = () => {
    setFilter("all");
    dispatch(setSearchQuery(""));
    dispatch(setQuery(""));
  };
  return (
    <>
      <RadioGroup
        defaultValue={filter}
        color="default"
        label="Select Category"
        classNames={{
          label: "text-black text-sm",
        }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <Radio value="all">All</Radio>
        {categories.map((c) => (
          <Radio value={c.id} key={c.id}>
            {c.name}
          </Radio>
        ))}
      </RadioGroup>

      <Button onPress={handleClear} color="primary">
        Clear Filter
      </Button>
    </>
  );
};

export default CategoryFilterSidebar;
