import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "./sliderSlice";
import productsSlice from "./productsSlice";
import categorySlice from "./categoriesSlice";
import searchSlice from "./searchSlice";
import popupSlice from "./popupSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    slideReducer,
    productsSlice,
    categorySlice,
    searchSlice,
    popupSlice,
    userSlice
  },
});

export default store;
