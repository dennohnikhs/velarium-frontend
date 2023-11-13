import { EntityPayload, GetEntitiesRes } from "@models/api/master";
import { Entity } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddEntity,
  apiGetEntities,
  apiGetEntitiesByType,
  apiUpdateEntity,
} from "api/master/entity";
import { isAxiosError } from "axios";

export const reduxGetEntities = createAsyncThunk<GetEntitiesRes>(
  "GET_ENTITIES",
  async (_, { rejectWithValue }) => {
    return apiGetEntities().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxGetEntitiesByType = createAsyncThunk<
  GetEntitiesRes,
  "INT" | "INS"
>("GET_ENTITIES_BY_TYPE", async (type, { rejectWithValue }) => {
  return apiGetEntitiesByType(type).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export const reduxAddEntity = createAsyncThunk<Entity, EntityPayload>(
  "ADD_ENTITY",
  async (values, { rejectWithValue }) => {
    return apiAddEntity(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export const reduxUpdateEntity = createAsyncThunk<Entity, EntityPayload>(
  "UPDATE_VEHICLE_MAKE",
  async (values, { rejectWithValue }) => {
    return apiUpdateEntity(values, values.id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);
