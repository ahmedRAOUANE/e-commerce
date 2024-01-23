import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "./sliderSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: {
    slider: slideReducer,
    productSlice: productsSlice,
  },
});

export default store;
