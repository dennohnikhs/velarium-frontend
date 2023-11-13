import { GetMasterDataSummary } from "@models/api/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetMasterDataSummary } from "api/master/data-summary";
import { isAxiosError } from "axios";

export const reduxGetMasterDataSummary = createAsyncThunk<GetMasterDataSummary>(
  "GET_MASTER_DATA_SUMMARY",
  async (_, { rejectWithValue }) => {
    return apiGetMasterDataSummary().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
      return Promise.reject(e);
    });
  }
);
