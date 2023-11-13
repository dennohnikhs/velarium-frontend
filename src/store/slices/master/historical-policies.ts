import { HistoricalPolicies } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetHistoricalPolicies } from "store/actions/master/historical-policies";

const initialState: HistoricalPoliciesState = {
  historical_policies: {
    data: [],
    loading: false,
  },
};

const historicalPolicies = createSlice({
  name: "vehicle-makes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get data
      .addCase(reduxGetHistoricalPolicies.fulfilled, (state, action) => {
        state.historical_policies = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetHistoricalPolicies.pending, (state) => {
        state.historical_policies = {
          data: [...state.historical_policies.data],
          loading: true,
        };
      })
      .addCase(reduxGetHistoricalPolicies.rejected, (state) => {
        state.historical_policies = {
          data: [...state.historical_policies.data],
          loading: "error",
        };
      })
  },
});

type HistoricalPoliciesState = {
  historical_policies: {
    data: HistoricalPolicies[];
    loading: Loading;
  };
};

export default historicalPolicies.reducer;
