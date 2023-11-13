import { VehicleModel } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddVehicleModel,
  reduxDeleteVehicleModel,
  reduxGetVehicleModels,
  reduxUpdateVehicleModel,
} from "store/actions/master/vehicle-model";

const initialState: VehicleModelsState = {
  vehicle_models: {
    data: [],
    loading: false,
  },
};

const vehicleModels = createSlice({
  name: "vehicle-models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get vehicle models
      .addCase(reduxGetVehicleModels.fulfilled, (state, action) => {
        state.vehicle_models = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetVehicleModels.pending, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: true,
        };
      })
      .addCase(reduxGetVehicleModels.rejected, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: "error",
        };
      })
      // add vehicle model
      .addCase(reduxAddVehicleModel.fulfilled, (state, action) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddVehicleModel.pending, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: true,
        };
      })
      .addCase(reduxAddVehicleModel.rejected, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: "error",
        };
      })
      // update
      .addCase(reduxUpdateVehicleModel.fulfilled, (state, action) => {
        state.vehicle_models = {
          data: [
            ...state.vehicle_models.data.map((model) =>
              model.id !== action.payload.id ? model : action.payload ?? model
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxUpdateVehicleModel.pending, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: true,
        };
      })
      .addCase(reduxUpdateVehicleModel.rejected, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: "error",
        };
      })
      // delete
      .addCase(reduxDeleteVehicleModel.fulfilled, (state, { meta }) => {
        state.vehicle_models = {
          data: [
            ...state.vehicle_models.data.filter(
              (model) => model.id !== meta.arg
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxDeleteVehicleModel.pending, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: true,
        };
      })
      .addCase(reduxDeleteVehicleModel.rejected, (state) => {
        state.vehicle_models = {
          data: [...state.vehicle_models.data],
          loading: "error",
        };
      });
  },
});

type VehicleModelsState = {
  vehicle_models: {
    data: VehicleModel[];
    loading: Loading;
  };
};

export default vehicleModels.reducer;
