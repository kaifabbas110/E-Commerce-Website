// import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://dummyjson.com/products";
// const { FeatureItems } = useSelector((store) => store.cart);

const initialState = {
  FilteredItems: [],
  FilterSection: [],
  isLoading: true,
  minPrice: 0,
  maxPrice: 0,
  selectedProduct: {},
};

export const getFilterItems = createAsyncThunk(
  "filter/getFilterItems",
  async (thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getProductById = createAsyncThunk(
  "filter/getProductById",
  async (id, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCheckedFilterItems = createAsyncThunk(
  "filter/getCheckedFilterItems",

  async (filter, thunkAPI) => {
    try {
      let queryString = "";
      for (const key in filter) {
        queryString += `${key}/${filter[key]}`;
      }
      const resp = await axios(`${url}/${queryString}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilterItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilterItems.fulfilled, (state, { payload }) => {
      const { products } = payload;
      //add quantity property into every product
      products.forEach((e) => {
        e.quantity = 1;
      });
      payload.filterSection = [
        {
          id: "category",
          name: "category",
          options: [...new Set(products.map((e) => e.category))].map((e) => ({
            label: e,
            value: e,
            checked: false,
          })),
        },
      ];

      state.FilteredItems = products;
      state.FilterSection = payload.filterSection;
      state.isLoading = false;
      const price = products.map((e) => e.price);
      state.maxPrice = Math.max(...price);
      state.minPrice = Math.min(...price);
    });
    builder.addCase(getFilterItems.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getCheckedFilterItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCheckedFilterItems.fulfilled, (state, { payload }) => {
      state.FilteredItems = payload.products;
      state.isLoading = false;
    });
    builder.addCase(getCheckedFilterItems.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.selectedProduct = payload;
      state.isLoading = false;
    });
    builder.addCase(getProductById.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = filterSlice.actions;
export default filterSlice.reducer;
