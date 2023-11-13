import {
  Business,
  EntityLinesOfBusinessParams,
} from "@models/master/entity-lines-of-business";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetEntityLinesOfBusiness } from "api/master/entity-lines-of-business";
import { isAxiosError } from "axios";

export const reduxGetEntityLinesOfBusiness = createAsyncThunk<
  Business[],
  EntityLinesOfBusinessParams
>("GET_ENTITY_LINE_OF_BUSINESS", async (params, { rejectWithValue }) => {
  return apiGetEntityLinesOfBusiness(params).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
    return Promise.reject(e);
  });
});
