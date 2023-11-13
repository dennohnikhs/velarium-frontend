import { VehiclePaintType } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetVehiclePaintTypes } from "store/actions/master/vehicle-paint-types";

const initialState: VehiclePaintTypesState = {
  vehicle_paint_types: {
    data: [],
    loading: false,
  },
};

const vehiclePaintTypes = createSlice({
  name: "vehicle-colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get vehicles paint types
      .addCase(reduxGetVehiclePaintTypes.fulfilled, (state, action) => {
        state.vehicle_paint_types = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetVehiclePaintTypes.pending, (state) => {
        state.vehicle_paint_types = {
          data: [...state.vehicle_paint_types.data],
          loading: true,
        };
      })
      .addCase(reduxGetVehiclePaintTypes.rejected, (state) => {
        state.vehicle_paint_types = {
          data: [...state.vehicle_paint_types.data],
          loading: "error",
        };
      });
  },
});

type VehiclePaintTypesState = {
  vehicle_paint_types: {
    data: VehiclePaintType[];
    loading: Loading;
  };
};

export default vehiclePaintTypes.reducer;
