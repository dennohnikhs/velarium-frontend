import { Businessectors } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddBusinesssectors,
  reduxGetBusinesssectors,
  reduxUpdateBusinesssectors,
} from "store/actions/master/businessectors";



const initialState: BusinesssectorsState = {
  businesssectors: {
    data: [],
    loading: false,
    
  },
};

const businesssectors = createSlice({
  name: "businesssectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get entities
      .addCase(reduxGetBusinesssectors.fulfilled, (state, action) => {
        state.businesssectors = {
          ...state.businesssectors,
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetBusinesssectors.pending, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: true,
        };
      })
      .addCase(reduxGetBusinesssectors.rejected, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: "error",
        };
      })

     

      // Add entity
      .addCase(reduxAddBusinesssectors.fulfilled, (state, action) => {
        state.businesssectors = {
          ...state.businesssectors,
          data: [...state.businesssectors.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddBusinesssectors.pending, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: true,
        };
      })
      .addCase(reduxAddBusinesssectors.rejected, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: "error",
        };
      })

      // update entity
      .addCase(reduxUpdateBusinesssectors.fulfilled, (state, action) => {
        state.businesssectors = {
          ...state.businesssectors,
          data: [
            ...state.businesssectors.data.map((businesssector) =>
              businesssector.id !== action.payload.id
                ? businesssector
                : action.payload ?? businesssector
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxUpdateBusinesssectors.pending, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: true,
        };
      })
      .addCase(reduxUpdateBusinesssectors.rejected, (state) => {
        state.businesssectors = {
          ...state.businesssectors,
          loading: "error",
        };
      });
  },
});

type BusinesssectorsState = {
  businesssectors: {
    data: Businessectors[];    
    loading: Loading;
  };
};

export default businesssectors.reducer;
