import {
  GetPolicyInfoRes,
  PolicyInfoPayload,
  PolicyUpdatePayload,
  ValidatePolicyInfoRes,
} from "@models/api/master";
import {
  GetPolicyInfoParams,
  PolicyInfo,
  PolicyInfoSummary,
  ValidatePolicyInfoParams,
} from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddPolicyInfo,
  apiGetAllPolicyInfo,
  apiGetPolicyInfoSummary,
  apiUpdatePolicyInfo,
  apiValidatePolicyInfo,
} from "api/master/policy-info";
import { isAxiosError } from "axios";

export const reduxGetAllPolicyInfo = createAsyncThunk<
  GetPolicyInfoRes,
  GetPolicyInfoParams
>("GET_ALL_POLICY_INFO", async (params, { rejectWithValue }) => {
  return apiGetAllPolicyInfo(params).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxValidatePolicyInfo = createAsyncThunk<
  ValidatePolicyInfoRes,
  ValidatePolicyInfoParams
>(
  "VALIDATE_POLICY_INFO",
  async ({ risk_id, date_from, date_to }, { rejectWithValue }) => {
    return apiValidatePolicyInfo({ risk_id, date_from, date_to }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxAddPolicyInfo = createAsyncThunk<
  PolicyInfo,
  PolicyInfoPayload
>("ADD_POLICY_INFO", async (data, { rejectWithValue }) => {
  return apiAddPolicyInfo(data).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxUpdatePolicyInfo = createAsyncThunk<
  PolicyInfo,
  PolicyUpdatePayload
>("UPDATE_POLICY_INFO", async (data, { rejectWithValue }) => {
  return apiUpdatePolicyInfo(data).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxGetPolicyInfoSummary = createAsyncThunk<
  PolicyInfoSummary,
  string
>("GET_POLICY_INFO_SUMMARY", async (insurance_id, { rejectWithValue }) => {
  return apiGetPolicyInfoSummary(insurance_id).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});
