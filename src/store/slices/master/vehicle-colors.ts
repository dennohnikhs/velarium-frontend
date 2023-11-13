import { VehicleColor } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetVehicleColors } from "store/actions/master/vehicle-colors";

const initialState: VehicleColorsState = {
  vehicle_colors: {
    data: [],
    loading: false,
  },
};

const vehicleColors = createSlice({
  name: "vehicle-colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get vehicles colors
      .addCase(reduxGetVehicleColors.fulfilled, (state, action) => {
        state.vehicle_colors = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetVehicleColors.pending, (state) => {
        state.vehicle_colors = {
          data: [...state.vehicle_colors.data],
          loading: true,
        };
      })
      .addCase(reduxGetVehicleColors.rejected, (state) => {
        state.vehicle_colors = {
          data: [...state.vehicle_colors.data],
          loading: "error",
        };
      });
  },
});

type VehicleColorsState = {
  vehicle_colors: {
    data: VehicleColor[];
    loading: Loading;
  };
};

export default vehicleColors.reducer;
