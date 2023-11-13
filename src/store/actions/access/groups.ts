import { Group } from "@models/access/groups";
import {
  CreateUserGroupPayload,
  GetAllGroupsResponse,
  UpdateUserGroupPayload,
} from "@models/api/access/groups";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateUserGroup,
  apiGetAllGroups,
  apiUpdateUserGroup,
} from "api/access/groups";
import { isAxiosError } from "axios";

const reduxCreateUserGroup = createAsyncThunk<Group, CreateUserGroupPayload>(
  "CREATE_GROUP",
  async (values, { rejectWithValue }) => {
    return apiCreateUserGroup(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxUpdateUserGroup = createAsyncThunk<Group, UpdateUserGroupPayload>(
  "UPDATE_GROUP",
  async (values, { rejectWithValue }) => {
    return apiUpdateUserGroup(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxGetAllGroups = createAsyncThunk<GetAllGroupsResponse>(
  "GET_ALL_GROUPS",
  apiGetAllGroups
);

export { reduxCreateUserGroup, reduxGetAllGroups, reduxUpdateUserGroup };
