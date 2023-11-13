import { GetVehicleModelRes, VehicleModelPayload } from "@models/api/master";
import { VehicleModel } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddVehicleModel,
  apiDeleteVehicleModel,
  apiGetVehicleModels,
  apiUpdateVehicleModel,
} from "api/master/vehicle-model";
import { isAxiosError } from "axios";

export const reduxAddVehicleModel = createAsyncThunk<
  VehicleModel,
  VehicleModelPayload
>("ADD_VEHICLE_MODEL", async (values, { rejectWithValue }) => {
  return apiAddVehicleModel(values).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxGetVehicleModels = createAsyncThunk<GetVehicleModelRes>(
  "GET_VEHICLE_MODELS",
  async (_, { rejectWithValue }) => {
    return apiGetVehicleModels().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateVehicleModel = createAsyncThunk<
  VehicleModel,
  VehicleModelPayload
>("UPDATE_VEHICLE_MODEL", async (values, { rejectWithValue }) => {
  return apiUpdateVehicleModel(values, values.id).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxDeleteVehicleModel = createAsyncThunk<VehicleModel, string>(
  "DELETE_VEHICLE_MODEL",
  async (id, { rejectWithValue }) => {
    return apiDeleteVehicleModel(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
