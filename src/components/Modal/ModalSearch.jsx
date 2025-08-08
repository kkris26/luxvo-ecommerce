import { Modal, ModalContent, ModalBody, Input, Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  setOpenSearch,
  setQuery,
  setSearchQuery,
} from "../../redux/features/search/searchSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

const ModalSearch = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery, openSearch, query } = useSelector(
    (state) => state.search
  );
  const handleCloseModal = () => {
    dispatch(setOpenSearch(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setOpenSearch(false));
    navigate("/shop");
    dispatch(setSearchQuery(query));
  };

  return (
    <>
      <Modal
        size={"lg"}
        isOpen={openSearch}
        onOpenChange={handleCloseModal}
        className="py-4"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex gap-5 flex-col  w-full">
              <h2 className="text-xl ">Find What You’re Looking For</h2>
              <form action="" onSubmit={onSubmit} className="flex gap-3">
                <Input
                  placeholder="Search something..."
                  type="text"
                  variant={"underlined"}
                  value={query}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                />
                <Button type="submit" color="primary">Search</Button>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSearch;
