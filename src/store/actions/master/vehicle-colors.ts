import { VehicleColor } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetVehicleColors } from "api/master/vehicle-colors";
import { isAxiosError } from "axios";

export const reduxGetVehicleColors = createAsyncThunk<VehicleColor[]>(
  "GET_VEHICLE_COLORS",
  async (_, { rejectWithValue }) => {
    return apiGetVehicleColors().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
