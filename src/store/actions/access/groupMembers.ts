import { GroupMember } from "@models/access/groups";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import {
  apiGetGroupMembers,
  apiAddGroupMember,
  apiDeleteGroupMember,
  GroupData,
} from "api/access/groupMember";

const reduxGetGroupMembers = createAsyncThunk<GroupMember[], string>(
  "GET_GROUP_MEMBERS",
  async (id, { rejectWithValue }) => {
    console.log(id);
    return apiGetGroupMembers(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

const reduxAddGroupMember = createAsyncThunk<
  GroupMember,
  { user_id: string; group_id: string }
>("ADD_GROUP_MEMBER", async ({ user_id, group_id }, { rejectWithValue }) => {
  return apiAddGroupMember({ user_id, group_id }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response.data);
    return Promise.reject(e);
  });
});

const reduxDeleteGroupMember = createAsyncThunk<GroupMember[], GroupData>(
  "DELETE_GROUP_MEMBER",
  async ({ group_id, user_id }, { rejectWithValue }) => {
    return apiDeleteGroupMember({ group_id, user_id }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue(e.response.data);
      return Promise.reject(e);
    });
  }
);

export { reduxGetGroupMembers, reduxAddGroupMember, reduxDeleteGroupMember };
