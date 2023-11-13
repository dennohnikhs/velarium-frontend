import { UserMember, Member } from "@models/members/members";
import {
  CreateUserMemberPayload,
  CreateMemberPayload,  
  GetAllMemberResponse,
  UpdateMemberPayload,
} from "@models/api/members/members";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateUserMember,
  apiCreateMember,
  apiGetAllMembers,
  apiUpdateUserMember,
} from "api/members/members";
import { isAxiosError } from "axios";

const reduxCreateUserMember = createAsyncThunk<Member, CreateUserMemberPayload>(
  "CREATE_USER_MEMBER",
  async (values, { rejectWithValue }) => {
    return apiCreateUserMember(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxCreateMember = createAsyncThunk<Member, CreateMemberPayload>(
  "CREATE_MEMBER",
  async (values, { rejectWithValue }) => {
    return apiCreateMember(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxUpdateMember = createAsyncThunk<Member, UpdateMemberPayload>(
  "UPDATE_GROUP",
  async (values, { rejectWithValue }) => {
    return apiUpdateUserMember(values).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxGetAllMembers = createAsyncThunk<GetAllMemberResponse>(
  "GET_ALL_MEMBERS",
  apiGetAllMembers
);

export { reduxCreateMember, reduxCreateUserMember, reduxGetAllMembers, reduxUpdateMember };
