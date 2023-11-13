import { EntityMappingPayload, GetEntityMappingsParams, GetEntityMappingsRes } from "@models/api/master";
import { EntityMapping } from "@models/master";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddEntityMapping,
  apiDeleteEntityMapping,
  apiGetEntityMappings,
} from "api/master/entity-mappings";
import { isAxiosError } from "axios";

export const reduxGetEntityMappings = createAsyncThunk<GetEntityMappingsRes, GetEntityMappingsParams>(
  "GET_ENTITY_MAPPINGS",
  async ({ insurance_id }, { rejectWithValue }) => {
    return apiGetEntityMappings({insurance_id}).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});
      return Promise.reject(e);
    });
  }
);

export const reduxAddEntityMapping = createAsyncThunk<
  EntityMapping,
  EntityMappingPayload
>("ADD_ENTITY_MAPPING", async (values, { rejectWithValue }) => {
  return apiAddEntityMapping(values).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});

    return Promise.reject(e);
  });
});

export const reduxDeleteEntityMapping = createAsyncThunk<EntityMapping, string>(
  "DELETE_ENTITY_MAPPING",
  async (id, { rejectWithValue }) => {
    return apiDeleteEntityMapping(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data ?? {});

      return Promise.reject(e);
    });
  }
);
