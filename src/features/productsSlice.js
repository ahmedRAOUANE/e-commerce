import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    updateProductList: (state, { payload }) => {
      state.products = payload;
    },
    addProduct: (state, action) => {},
  },
});

export const { addProduct, updateProductList } = productSlice.actions;
export default productSlice.reducer;
