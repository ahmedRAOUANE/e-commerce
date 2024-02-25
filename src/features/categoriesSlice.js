import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setError: (state, {payload}) => {
      state.error = payload;
    }
  },
});

export const { setCategories, setError } = categorySlice.actions;
export default categorySlice.reducer;
