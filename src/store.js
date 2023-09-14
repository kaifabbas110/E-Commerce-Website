import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cartSlice";
import filterReducer from "./Cart/filter";
// import modalReducer from "./features/cart/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    // modal: modalReducer,
  },
});
