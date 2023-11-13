import { BusinessesPayload, GetBusinessesRes } from "@models/api/master";
import { Businesses } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 apiGetBusinesses,
  apiAddBusiness,
  apiGetBusinessById,  
  apiUpdateBusiness,
} from "api/master/businesses";
import { isAxiosError } from "axios";

export const reduxGetBusinesses = createAsyncThunk<GetBusinessesRes>(
  "GET_BUSINESSES",
  async (_, { rejectWithValue }) => {
    return apiGetBusinesses().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);



export const reduxCreateBusiness = createAsyncThunk<Businesses, BusinessesPayload>(
  "ADD_BUSINESS",
  async (values, { rejectWithValue }) => {
    return apiAddBusiness(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateBusiness = createAsyncThunk<Businesses, BusinessesPayload>(
  "UPDATE_BUSINESS",
  async (values, { rejectWithValue }) => {
    return apiUpdateBusiness(values, values.id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
