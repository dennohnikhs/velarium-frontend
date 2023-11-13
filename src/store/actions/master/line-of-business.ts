import { GetLineOfBusinessParams, LineOfBusinessPayload } from "@models/api/master/line-of-business";
import { LineOfBusiness } from "@models/master/";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddLineOfBusiness,
  apiDeleteLineOfBusiness,
  apiGetLineOfBusinesses,
  apiUpdateLineOfBusiness,
} from "api/master/line-of-business";
import { isAxiosError } from "axios";

export const reduxAddLineOfBusiness = createAsyncThunk<
  LineOfBusiness,
  LineOfBusinessPayload
>("ADD_LINE_OF_BUSINESS", async (values, { rejectWithValue }) => {
  return apiAddLineOfBusiness(values).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxUpdateLineOfBusiness = createAsyncThunk<
  LineOfBusiness,
  LineOfBusinessPayload
>("UPDATE_LINE_OF_BUSINESS", async (values, { rejectWithValue }) => {
  return apiUpdateLineOfBusiness(values).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxGetLineOfBusinesses = createAsyncThunk<LineOfBusiness[], GetLineOfBusinessParams>(
  "GET_LINE_OF_BUSINESSES",
  async ({ insurance_id }, { rejectWithValue }) => {
    return apiGetLineOfBusinesses({insurance_id}).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxDeleteLineOfBusiness = createAsyncThunk<any, string>(
  "DELETE_LINE_OF_BUSINESS",
  async (id, { rejectWithValue }) => {
    return apiDeleteLineOfBusiness(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response?.data ?? {});

      return Promise.reject(e);
    });
  }
);
