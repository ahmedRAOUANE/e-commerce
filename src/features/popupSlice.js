import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: { isOpen: false, type: "" },
  reducers: {
    setIsOpen: (state, { payload }) => {
      state.isOpen = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
  },
});

export const { setIsOpen, setType } = popupSlice.actions;
export default popupSlice.reducer;
