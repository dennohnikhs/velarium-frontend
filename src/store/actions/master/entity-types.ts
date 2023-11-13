import { EntityTypePayload, GetEntityTypesRes } from "@models/api/master";
import { EntityType } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddEntityType,
  apiDeleteEntityType,
  apiGetEntityType,
  apiGetEntityTypes,
  apiUpdateEntityType,
} from "api/master/entity-types";
import { isAxiosError } from "axios";

export const reduxGetEntityTypes = createAsyncThunk<GetEntityTypesRes>(
  "GET_ENTITY_TYPES",
  async (_, { rejectWithValue }) => {
    return apiGetEntityTypes().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
      return Promise.reject(e);
    });
  }
);

export const reduxGetEntityType = createAsyncThunk<EntityType, string>(
  "GET_ENTITY_TYPE",
  async (id, { rejectWithValue }) => {
    return apiGetEntityType(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
      return Promise.reject(e);
    });
  }
);

export const reduxAddEntityType = createAsyncThunk<
  EntityType,
  EntityTypePayload
>("ADD_ENTITY_TYPE", async (values, { rejectWithValue }) => {
  return apiAddEntityType(values).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});

    return Promise.reject(e);
  });
});

export const reduxUpdateEntityType = createAsyncThunk<
  EntityType,
  EntityTypePayload
>("UPDATE_ENTITY_TYPE", async (values, { rejectWithValue }) => {
  return apiUpdateEntityType(values, values.id).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});

    return Promise.reject(e);
  });
});

export const reduxDeleteEntityType = createAsyncThunk<EntityType, string>(
  "DELETE_ENTITY_TYPE",
  async (id, { rejectWithValue }) => {
    return apiDeleteEntityType(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});

      return Promise.reject(e);
    });
  }
);
