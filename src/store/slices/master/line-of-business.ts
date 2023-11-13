import { LineOfBusiness } from "@models/master/";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddLineOfBusiness,
  reduxDeleteLineOfBusiness,
  reduxGetLineOfBusinesses,
  reduxUpdateLineOfBusiness,
} from "store/actions/master/line-of-business";

const initialState: LineOfBusinessState = {
  lineOfBusiness: {
    data: [],
    loading: false,
  },
};

const lineOfBusiness = createSlice({
  name: "line of business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxAddLineOfBusiness.fulfilled, (state, action) => {
        state.lineOfBusiness = {
          data: [...state.lineOfBusiness.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddLineOfBusiness.pending, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: true,
        };
      })
      .addCase(reduxAddLineOfBusiness.rejected, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: "error",
        };
      })
      .addCase(reduxUpdateLineOfBusiness.fulfilled, (state, action) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: false,
          data: [
            ...state.lineOfBusiness.data.filter(
              (lob) => lob.id !== action.payload.id
            ),
            action.payload,
          ],
        };
      })
      .addCase(reduxUpdateLineOfBusiness.pending, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: true,
        };
      })
      .addCase(reduxUpdateLineOfBusiness.rejected, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: "error",
        };
      })
      .addCase(reduxGetLineOfBusinesses.fulfilled, (state, action) => {
        state.lineOfBusiness = {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(reduxGetLineOfBusinesses.pending, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: true,
        };
      })
      .addCase(reduxGetLineOfBusinesses.rejected, (state) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: "error",
        };
      })
      //delete
      .addCase(reduxDeleteLineOfBusiness.fulfilled, (state, { meta }) => {
        state.lineOfBusiness = {
          ...state.lineOfBusiness,
          loading: false,
          data: [
            ...state.lineOfBusiness.data.filter((lob) => lob.id !== meta.arg),
          ],
        };
      });
  },
});

type LineOfBusinessState = {
  lineOfBusiness: {
    data: LineOfBusiness[];
    loading: Loading;
  };
};

export default lineOfBusiness.reducer;
