import { IncomesourcesPayload, GetIncomesourcesRes } from "@models/api/master";
import { Incomesources } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetIncomesources,
  apiAddIncomesources,   
  apiUpdateIncomesources
} from "api/master/incomesources";
import { isAxiosError } from "axios";

export const reduxGetIncomesources = createAsyncThunk<GetIncomesourcesRes>(
  "GET_INCOME_SOURCES",
  async (_, { rejectWithValue }) => {
    return apiGetIncomesources().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
export const reduxAddIncomesources = createAsyncThunk<Incomesources, IncomesourcesPayload>(
  "INCOME_SOURCES",
  async (values, { rejectWithValue }) => {
    return apiAddIncomesources(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateIncomesources = createAsyncThunk<Incomesources, IncomesourcesPayload>(
  "INCOME_SOURCES",
  async (values, { rejectWithValue }) => {
    return apiUpdateIncomesources(values, values.id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
