import { GetBusinessectorsRes, BusinessectorsPayload } from "@models/api/master";
import { Businessectors } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddBusinessectors,
  apiGetBusinessectors,
  apiUpdateBusinessectors,
} from "api/master/businesssectors";
import { isAxiosError } from "axios";

export const reduxGetBusinesssectors = createAsyncThunk<GetBusinessectorsRes>(
  "GET_Sector",
  async (_, { rejectWithValue }) => {
    return apiGetBusinessectors().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
export const reduxAddBusinesssectors = createAsyncThunk<
  Businessectors,
  BusinessectorsPayload
>("ADD_Business_Sector", async (values, { rejectWithValue }) => {
  return apiAddBusinessectors(values as any).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxUpdateBusinesssectors = createAsyncThunk<
  Businessectors,
  BusinessectorsPayload
>("UPDATE_Business_Sector", async (values, { rejectWithValue }) => {
  return apiUpdateBusinessectors(values as any, values.id).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});
