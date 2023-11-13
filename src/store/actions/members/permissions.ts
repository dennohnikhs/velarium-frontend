import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllPermissions } from "api/access/permissions";

import { SessionPermissionsResponse } from "@models/access/access";
import { apiGetSessionPermissions } from "api/access/access";
import { isAxiosError } from "axios";

export const reduxGetAllPermissions = createAsyncThunk(
  "GET_ALL_PERMISSIONS",
  apiGetAllPermissions
);

export const reduxGetSessionPermissions =
  createAsyncThunk<SessionPermissionsResponse>(
    "GET_SESSION_PERMISSIONS",
    async (_, { rejectWithValue }) => {
      return apiGetSessionPermissions().catch((e) => {
        if (isAxiosError(e)) return rejectWithValue(e.response.data);
        return Promise.reject(e);
      });
    }
  );
