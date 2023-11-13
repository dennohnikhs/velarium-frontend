import { GetHistoricalPoliciesParams, GetHistoricalPoliciesRes } from "@models/api/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetHistoricalPolicies } from "api/master/historical-policies";
import { isAxiosError } from "axios";

export const reduxGetHistoricalPolicies = createAsyncThunk<GetHistoricalPoliciesRes, GetHistoricalPoliciesParams>(
    "GET_HISTORICAL_POLICIES",
    async (params, { rejectWithValue }) => {
        return apiGetHistoricalPolicies(params).catch((e) => {
            if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
            return Promise.reject(e);
        });
    }
);

