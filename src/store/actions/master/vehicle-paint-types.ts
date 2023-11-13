import { VehiclePaintType } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetVehiclePaintTypes } from "api/master/vehicle-paint-type";
import { isAxiosError } from "axios";

export const reduxGetVehiclePaintTypes = createAsyncThunk<VehiclePaintType[]>(
  "GET_VEHICLE_PAINT_TYPES",
  async (_, { rejectWithValue }) => {
    return apiGetVehiclePaintTypes().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
