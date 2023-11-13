import { Incomesources } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddIncomesources,
  reduxGetIncomesources,
  reduxUpdateIncomesources
} from "store/actions/master/incomesources";

const initialState: IncomesourcesState = {
  incomesources: {
    data: [],
    loading: false,
    
  },
};

const incomesources = createSlice({
  name: "incomesources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get entities
      .addCase(reduxGetIncomesources.fulfilled, (state, action) => {
        state.incomesources = {
          ...state.incomesources,
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetIncomesources.pending, (state) => {
        state.incomesources = {
          ...state.incomesources,
          loading: true,
        };
      })
      .addCase(reduxGetIncomesources.rejected, (state) => {
        state.incomesources = {
          ...state.incomesources,
          loading: "error",
        };
      })

     

      // Add entity
      .addCase(reduxAddIncomesources.fulfilled, (state, action) => {
        state.incomesources = {
          ...state.incomesources,
          data: [...state.incomesources.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddIncomesources.pending, (state) => {
        state.incomesources = {
          ...state.incomesources,
          loading: true,
        };
      })
      .addCase(reduxAddIncomesources.rejected, (state) => {
        state.incomesources = {
          ...state.incomesources,
          loading: "error",
        };
      })

      // update entity
      // .addCase(reduxUpdateIncomesources.fulfilled, (state, action) => {
      //   state.incomesources = {
      //     ...state.incomesources,
      //     data: [
      //       ...state.incomesources.data.map((incomesource) =>
      //         incomesource.id !== action.payload.id
      //           ? incomesource
      //           : action.payload ?? incomesource
      //       ),
      //     ],
      //     loading: false,
      //   };
      // })
      // .addCase(reduxUpdateIncomesources.pending, (state) => {
      //   state.incomesources = {
      //     ...state.incomesources,
      //     loading: true,
      //   };
      // })
      // .addCase(reduxUpdateIncomesources.rejected, (state) => {
      //   state.incomesources = {
      //     ...state.incomesources,
      //     loading: "error",
      //   };
      // });
  },
});

type IncomesourcesState = {
  incomesources: {
    data: Incomesources[];    
    loading: Loading;
  };
};

export default incomesources.reducer;
