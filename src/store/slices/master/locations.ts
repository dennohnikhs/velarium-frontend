import { Locations } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddLocation,
  reduxGetLocations,
  reduxUpdateLocation,
} from "store/actions/master/locations";

const initialState: LocationsState = {
  locations: {
    data: [],
    loading: false,
    
  },
};

const locations = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get entities
      .addCase(reduxGetLocations.fulfilled, (state, action) => {
        state.locations = {
          ...state.locations,
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetLocations.pending, (state) => {
        state.locations = {
          ...state.locations,
          loading: true,
        };
      })
      .addCase(reduxGetLocations.rejected, (state) => {
        state.locations = {
          ...state.locations,
          loading: "error",
        };
      })

     

      // Add entity
      .addCase(reduxAddLocation.fulfilled, (state, action) => {
        state.locations = {
          ...state.locations,
          data: [...state.locations.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddLocation.pending, (state) => {
        state.locations = {
          ...state.locations,
          loading: true,
        };
      })
      .addCase(reduxAddLocation.rejected, (state) => {
        state.locations = {
          ...state.locations,
          loading: "error",
        };
      })

      // update entity
      .addCase(reduxUpdateLocation.fulfilled, (state, action) => {
        state.locations = {
          ...state.locations,
          data: [
            ...state.locations.data.map((location) =>
              location.id !== action.payload.id
                ? location
                : action.payload ?? location
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxUpdateLocation.pending, (state) => {
        state.locations = {
          ...state.locations,
          loading: true,
        };
      })
      .addCase(reduxUpdateLocation.rejected, (state) => {
        state.locations = {
          ...state.locations,
          loading: "error",
        };
      });
  },
});

type LocationsState = {
  locations: {
    data: Locations[];    
    loading: Loading;
  };
};

export default locations.reducer;
