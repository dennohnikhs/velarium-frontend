import { EmploymentPayload, GetEmploymentRes } from "@models/api/master";
import { Employment } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 apiGetEmployment,
  apiAddEmployment,
  apiUpdateEmployment,
} from "api/master/employment";
import { isAxiosError } from "axios";

export const reduxGetEmployment = createAsyncThunk<GetEmploymentRes>(
  "GET_EMPLOYMENT",
  async (_, { rejectWithValue }) => {
    return apiGetEmployment().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);



export const reduxCreateEmployment = createAsyncThunk<Employment, EmploymentPayload>(
  "ADD_GET_EMPLOYMENT",
  async (values, { rejectWithValue }) => {
    return apiAddEmployment(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateEmployment = createAsyncThunk<Employment, EmploymentPayload>(
  "UPDATE_GET_EMPLOYMENT",
  async (values, { rejectWithValue }) => {
    return apiUpdateEmployment(values, values.id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
