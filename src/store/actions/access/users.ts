import { User, UserStatus } from "@models/access/users";
import { GetUsersResponse, UserPayload } from "@models/api/access/users";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateUser,
  apiGetUsers,
  apiUpdateUser,
  apiUpdateUserStatus,
} from "api/access/users";
import { isAxiosError } from "axios";

const reduxCreateUser = createAsyncThunk<User, UserPayload>(
  "CREATE_USER",
  async (values, { rejectWithValue }) => {
    return apiCreateUser(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxGetUsers = createAsyncThunk<GetUsersResponse>(
  "GET_USERS",
  async (_, { rejectWithValue }) => {
    return apiGetUsers().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxUpdateUser = createAsyncThunk<User, UserPayload>(
  "UPDATE_USER",
  async (values, { rejectWithValue }) => {
    return apiUpdateUser(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxUpdateUserStatus = createAsyncThunk<
  User,
  { user_id: string; status: UserStatus }
>("UPDATE_USER_STATUS", async ({ user_id, status }, { rejectWithValue }) => {
  return apiUpdateUserStatus({ user_id, status }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

export {
  reduxCreateUser,
  reduxGetUsers,
  reduxUpdateUser,
  reduxUpdateUserStatus,
};
