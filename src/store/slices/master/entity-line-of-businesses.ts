import { Business } from "@models/master/entity-lines-of-business";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetEntityLinesOfBusiness } from "store/actions/master/entity-lines-of-business";

const initialState: LinesOfBusinessState = {
  entityLinesOfBusiness: {
    data: [],
    loading: false,
  },
};

const entityLinesOfBusiness = createSlice({
  name: "entity-line-of-business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get entity lines of business
      .addCase(
        reduxGetEntityLinesOfBusiness.fulfilled,
        (state, { payload }) => {
          state.entityLinesOfBusiness = {
            data: payload,
            loading: false,
          };
        }
      )
      .addCase(reduxGetEntityLinesOfBusiness.pending, (state) => {
        state.entityLinesOfBusiness = {
          ...state.entityLinesOfBusiness,
          loading: true,
        };
      })
      .addCase(reduxGetEntityLinesOfBusiness.rejected, (state) => {
        state.entityLinesOfBusiness = {
          ...state.entityLinesOfBusiness,
          loading: "error",
        };
      });
  },
});

type LinesOfBusinessState = {
  entityLinesOfBusiness: {
    data: Business[];
    loading: Loading;
  };
};

export default entityLinesOfBusiness.reducer;
