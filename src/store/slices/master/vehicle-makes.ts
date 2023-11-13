import { VehicleMake } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddVehicleMake,
  reduxDeleteVehicleMake,
  reduxGetVehicleMakes,
  reduxUpdateVehicleMake,
} from "store/actions/master/vehicle-makes";

const initialState: VehicleMakesState = {
  vehicle_makes: {
    data: [],
    loading: false,
  },
};

const vehicleMakes = createSlice({
  name: "vehicle-makes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add vehicle
    builder
      .addCase(reduxAddVehicleMake.fulfilled, (state, action) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddVehicleMake.pending, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: true,
        };
      })
      .addCase(reduxAddVehicleMake.rejected, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: "error",
        };
      })
      //update vehicles
      .addCase(reduxUpdateVehicleMake.fulfilled, (state, action) => {
        state.vehicle_makes = {
          loading: false,
          data: [
            ...state.vehicle_makes.data.map((make) =>
              make.id !== action.payload?.id ? make : action.payload ?? make
            ),
          ],
        };
      })
      // get vehicles
      .addCase(reduxGetVehicleMakes.fulfilled, (state, action) => {
        state.vehicle_makes = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetVehicleMakes.pending, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: true,
        };
      })
      .addCase(reduxGetVehicleMakes.rejected, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: "error",
        };
      })
      //delete
      .addCase(reduxDeleteVehicleMake.fulfilled, (state, { meta }) => {
        state.vehicle_makes = {
          data: [
            ...state.vehicle_makes.data.filter((make) => make.id !== meta.arg),
          ],
          loading: false,
        };
      })
      .addCase(reduxDeleteVehicleMake.pending, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: true,
        };
      })
      .addCase(reduxDeleteVehicleMake.rejected, (state) => {
        state.vehicle_makes = {
          data: [...state.vehicle_makes.data],
          loading: "error",
        };
      });
  },
});

type VehicleMakesState = {
  vehicle_makes: {
    data: VehicleMake[];
    loading: Loading;
  };
};

export default vehicleMakes.reducer;
