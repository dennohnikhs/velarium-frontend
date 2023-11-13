import { MasterDataSummary } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetMasterDataSummary } from "store/actions/master/data-summary";

const initialState: MasterDataSummaryState = {
  masterDataSummary: {
    data: {
      lines_of_business: 0,
      insurances: 0,
      intermediaries: 0,
    },
    loading: false,
  },
};

const masterDataSummary = createSlice({
  name: "master-data-summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetMasterDataSummary.fulfilled, (state, action) => {
        state.masterDataSummary = {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(reduxGetMasterDataSummary.pending, (state) => {
        state.masterDataSummary = {
          ...state.masterDataSummary,
          loading: true,
        };
      })
      .addCase(reduxGetMasterDataSummary.rejected, (state) => {
        state.masterDataSummary = {
          ...state.masterDataSummary,
          loading: "error",
        };
      });
  },
});

type MasterDataSummaryState = {
  masterDataSummary: {
    data: MasterDataSummary;
    loading: Loading;
  };
};

export default masterDataSummary.reducer;
