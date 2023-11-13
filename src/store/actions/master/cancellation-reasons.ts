import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCancellationReasons } from "api/master/cancellation-reasons";
import { isAxiosError } from "axios";

export const reduxGetCancellationReasons = createAsyncThunk(
  "GET_CANCELLATION_REASONS",
  async (_, { rejectWithValue }) => {
    return apiGetCancellationReasons().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
      return Promise.reject(e);
    });
  }
);
