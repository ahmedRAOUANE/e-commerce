import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { filteredData: [], isLoading: false },
  reducers: {
    setFilteredData: (state, { payload }) => {
      state.filteredData = payload;
    },
  },
});

export const { setFilteredData } = searchSlice.actions;
export default searchSlice.reducer;
