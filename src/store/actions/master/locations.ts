import { LocationPayload, GetLocationsRes } from "@models/api/master";
import { Locations } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddLocation,
  apiGetLocations,  
  apiUpdateLocation,
} from "api/master/locations";
import { isAxiosError } from "axios";

export const reduxGetLocations = createAsyncThunk<GetLocationsRes>(
  "GET_Locations",
  async (_, { rejectWithValue }) => {
    return apiGetLocations().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
export const reduxAddLocation = createAsyncThunk<Locations, LocationPayload>(
  "ADD_Location",
  async (values, { rejectWithValue }) => {
    return apiAddLocation(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateLocation = createAsyncThunk<Locations, LocationPayload>(
  "UPDATE_Location",
  async (values, { rejectWithValue }) => {
    return apiUpdateLocation(values, values.id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
