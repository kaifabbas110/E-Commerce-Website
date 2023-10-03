import { useAuth0 } from "@auth0/auth0-react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://dummyjson.com/products";

export const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  Amount: 0,
  Total: 0,
  AddToCart: getLocalStorage(),
  FeatureItems: [],
  AddToCartState: false,
  HamburgerState: false,
  CartOnHover: null,
  isLoading: true,
  isOpen: false,
  ToggleLog: false,
  Quantity: 1,
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
      // console.log("component render");
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
    incrementItemsQuantity: (state, { payload }) => {
      const itemToIncrement = state.AddToCart.find(
        (item) => item.id === payload.id
      );
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
      }
    },

    decrementItemsQuantity: (state, { payload }) => {
      const itemToDecrement = state.AddToCart.find(
        (item) => item.id === payload.id
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
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
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    removeFromCart: (state, { payload }) => {
      state.AddToCart = state.AddToCart.filter((e) => e.id !== payload);
    },
    addToCartToggle: (state, action) => {
      state.AddToCartState = !state.AddToCartState;
    },
    hamburgerToggle: (state, action) => {
      state.HamburgerState = !state.HamburgerState;
      state.ToggleLog = false;
    },
    showCartOnHover: (state, { payload }) => {
      state.CartOnHover = payload;
    },
    toggleLog: (state, { payload }) => {
      state.ToggleLog = !state.ToggleLog;
    },
  },
  extraReducers: (builder) => {
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
  incrementItemsQuantity,
  decrementItemsQuantity,
  openModal,
  closeModal,
  toggleLog,
} = cartSlice.actions;
export default cartSlice.reducer;
