import { CreatePaymentPayload} from "@models/api/master";
import { Payments } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddPayment,  
} from "api/master/payments";
import { isAxiosError } from "axios";


export const reduxAddPayment = createAsyncThunk<Payments, CreatePaymentPayload>(
  "ADD_Payments",
  async (values, { rejectWithValue }) => {
    return apiAddPayment(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);


