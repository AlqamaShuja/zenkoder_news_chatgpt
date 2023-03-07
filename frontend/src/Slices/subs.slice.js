import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StripeServices from "../Services/subs.service";

const initialState = {
    priceList: [],
    subscriptionList: [],
};

export const getPriceList = createAsyncThunk(
    "users/getPriceList",
    async (data, thunkAPI) => {
      const response = await StripeServices.getAllPrices();
      // console.log(response, "PricesTHUNK");
      return response.data;
    }
);

export const getSubsListThunk = createAsyncThunk(
    "users/getSubsListThunk",
    async (data, thunkAPI) => {
      // console.log(data, "stripeCustomerId");
      const response = await StripeServices.getSubsList(data);
      // console.log(response?.data?.data, "subsList");
      return response.data;
    }
  );

export const createSessionThunk = createAsyncThunk(
    "users/createSession",
    async (data, thunkAPI) => {
      // const response = await StripeServices.createSession(data)
      // console.log(response, "createSession");
      return StripeServices.createSession(data);
    }
);


export const Stripe = createSlice({
    name: "subscription",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder.addCase(getPriceList.fulfilled, (state, { payload }) => {
        // console.log(payload, "payloadsortedPrice");
        // const priceListedSorted = payload.filter((data) => data);
        const sortedPrice = payload.sort(
          (a, b) => a.priceItem.unit_amount - b.priceItem.unit_amount
        );
          // console.log(sortedPrice, "sortedPrice");
        state.priceList = sortedPrice;
      }).addCase(getSubsListThunk.fulfilled, (state, { payload }) => {
      
        state.subscriptionList = payload;
        // console.log(payload,"UPGRADEEEEE")
  
      })
    },
  });
  
//   export const priceList = (state) => state.stripe.priceList;
//   export const subscriptionList = (state) => state.stripe.subscriptionList;
  
  // Action creators are generated for each case reducer function
  
export default Stripe.reducer;