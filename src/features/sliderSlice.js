import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: 0,
    length: 4,
    imgs: [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath:
          "C:Users/Administrator/Desktop/reacte-commerce/src/assets/imgs/img1.jpg",
        id: 1,
        discount: "save 10% sale",
        discription: "is good for you!",
        category: "watches",
      },
      {
        label: "Bird",
        imgPath: "srcassetsimgsimg2.jpg",
        category: "electronics",
        id: 2,
      },
      {
        label: "Bali, Indonesia",
        category: "blog",
        imgPath: "srcassetsimgsimg3.jpg",
        id: 3,
      },
      {
        label: "Goč, Serbia",
        category: "electronics",
        imgPath: "srcassetsimgsimg4.jpg",
        id: 4,
      },
    ],
  },
  reducers: {
    prevSlide: (state, action) => {
      state.value = action.payload < 0 ? state.length : action.payload;
    },
    nextSlide: (state, action) => {
      state.value = action.payload > state.length ? 0 : action.payload;
    },
    dotSlide: (state, action) => {
      state.value = action.payload;
    },
  },
});

// actions
export const { prevSlide, nextSlide, dotSlide } = sliderSlice.actions;

// reducer
export default sliderSlice.reducer;
