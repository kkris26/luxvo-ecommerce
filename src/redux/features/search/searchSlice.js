import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  query: "",
  openSearch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setOpenSearch: (state, action) => {
      state.openSearch = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setOpenSearch, setSearchQuery, setQuery } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
