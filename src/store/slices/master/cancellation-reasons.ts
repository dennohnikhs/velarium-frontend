import { CancellationReason } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetCancellationReasons } from "store/actions/master/cancellation-reasons";

const initialState: CancellationReasonState = {
  cancellation_reasons: {
    data: [],
    loading: false,
  },
};

const cancellationReason = createSlice({
  name: "cancellation reasons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetCancellationReasons.fulfilled, (state, action) => {
        state.cancellation_reasons = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetCancellationReasons.pending, (state) => {
        state.cancellation_reasons = {
          ...state.cancellation_reasons,
          loading: true,
        };
      })
      .addCase(reduxGetCancellationReasons.rejected, (state) => {
        state.cancellation_reasons = {
          ...state.cancellation_reasons,
          loading: "error",
        };
      });
  },
});

type CancellationReasonState = {
  cancellation_reasons: {
    data: CancellationReason[];
    loading: Loading;
  };
};

export default cancellationReason.reducer;
