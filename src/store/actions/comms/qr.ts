import {
  GetQRPolicyInfoParams,
  GetQRPolicyInfoRes,
} from "@models/api/comms/qr";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetQRPolicyInfo } from "api/comms/qr";
import { isAxiosError } from "axios";

export const reduxGetQRPolicyInfo = createAsyncThunk<
  GetQRPolicyInfoRes,
  GetQRPolicyInfoParams
>("GET_QR_POLICY_INFO", async ({ cert_number }, { rejectWithValue }) => {
  return apiGetQRPolicyInfo({ cert_number }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});
