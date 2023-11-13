import { GetVehicleMakeRes, VehicleMakePayload } from "@models/api/master";
import { VehicleMake } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddVehicleMake,
  apiDeleteVehicleMake,
  apiGetVehicleMakes,
  apiUpdateVehicleMake,
} from "api/master/vehicle-makes";
import { isAxiosError } from "axios";

export const reduxGetVehicleMakes = createAsyncThunk<GetVehicleMakeRes>(
  "GET_VEHICLE_MAKES",
  async (_, { rejectWithValue }) => {
    return apiGetVehicleMakes().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxAddVehicleMake = createAsyncThunk<
  VehicleMake,
  VehicleMakePayload
>("ADD_VEHICLE_MAKE", async ({ name }, { rejectWithValue }) => {
  return apiAddVehicleMake({ name }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxUpdateVehicleMake = createAsyncThunk<
  VehicleMake,
  VehicleMakePayload
>("UPDATE_VEHICLE_MAKE", async ({ name, id }, { rejectWithValue }) => {
  return apiUpdateVehicleMake({ name, id }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxDeleteVehicleMake = createAsyncThunk<VehicleMake, string>(
  "DELETE_VEHICLE_MAKE",
  async (id, { rejectWithValue }) => {
    return apiDeleteVehicleMake(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
