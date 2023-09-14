import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://dummyjson.com/products";

const initialState = {
  Amount: 0,
  Total: 0,
  AddToCart: [],
  FeatureItems: [],
  AddToCartState: false,
  HamburgerState: false,
  CartOnHover: null,
  isLoading: true,
};

export const getFeatureItems = createAsyncThunk(
  "cart/getFeatureItems",
  //  () => {
  //   return fetch(url).then((resp) => {
  //     console.log(resp);
  //     return resp.json();
  //   });
  // }
  async (thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data.products;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    totalAmount: (state, { payload }) => {
      state.Amount += payload;
    },
    addToCart: (state, { payload }) => {
      const itemExists = state.AddToCart.find(
        (element) => element.id === payload.id
      );

      if (!itemExists) {
        state.AddToCart.push(payload);
      }
    },
    updateCartPageItemsQuantity: (state, { payload }) => {
      const { id, newQuantity } = payload;
      const item = state.AddToCart.find((element) => element.id === id);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    totalCalculation: (state) => {
      let total = 0;
      state.AddToCart.forEach((item) => {
        total += item.price * item.quantity;
      });
      state.Amount = state.AddToCart.length;
      state.Total = total;
    },
    removeFromCart: (state, { payload }) => {
      state.AddToCart = state.AddToCart.filter((e) => e.id !== payload);
    },
    addToCartToggle: (state, action) => {
      state.AddToCartState = !state.AddToCartState;
    },
    hamburgerToggle: (state, action) => {
      state.HamburgerState = !state.HamburgerState;
    },
    showCartOnHover: (state, { payload }) => {
      state.CartOnHover = payload;
    },
  },
  extraReducers: (builder) => {
    // [getFeatureItems.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getFeatureItems.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   state.FeatureItems = payload;
    //   state.isLoading = true;
    // },
    // [getFeatureItems.rejected]: (state) => {
    //   state.isLoading = true;
    // },
    builder.addCase(getFeatureItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeatureItems.fulfilled, (state, { payload }) => {
      //add quantity property into every product
      payload.forEach((e) => {
        e.quantity = 1;
      });
      state.FeatureItems = payload;
      state.isLoading = false;
    });
    builder.addCase(getFeatureItems.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  totalAmount,
  addToCart,
  hamburgerToggle,
  showCartOnHover,
  addToCartToggle,
  removeFromCart,
  totalCalculation,
  updateCartPageItemsQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
