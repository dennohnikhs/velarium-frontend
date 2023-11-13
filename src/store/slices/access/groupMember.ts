import { GroupMember } from "@models/access/groups";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddGroupMember,
  reduxDeleteGroupMember,
  reduxGetGroupMembers,
} from "store/actions/access/groupMembers";

const initialState: GroupMembersState = {
  groupMembers: {
    data: [],
    loading: false,
  },
};

const groupMembersSlice = createSlice({
  name: "groupMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add group member
      .addCase(reduxAddGroupMember.fulfilled, (state, action) => {
        return {
          ...state,
          groupMembers: {
            loading: false,
            data: [...state.groupMembers?.data, action?.payload],
          },
        };
      })
      .addCase(reduxAddGroupMember.pending, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: true,
        };
      })
      .addCase(reduxAddGroupMember.rejected, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: false,
        };
      })
      .addCase(reduxDeleteGroupMember.fulfilled, (state, action) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: false,
          data: [...action?.payload],
        };
      })
      .addCase(reduxDeleteGroupMember.pending, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: true,
        };
      })
      .addCase(reduxDeleteGroupMember.rejected, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: false,
        };
      })
      // get group members
      .addCase(reduxGetGroupMembers.fulfilled, (state, action) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: false,
          data: [...action.payload],
        };
      })
      .addCase(reduxGetGroupMembers.pending, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: true,
        };
      })
      .addCase(reduxGetGroupMembers.rejected, (state) => {
        state.groupMembers = {
          ...state.groupMembers,
          loading: "error",
        };
      });
  },
});

type GroupMembersState = {
  groupMembers: {
    data: GroupMember[];
    loading: Loading;
  };
};

export default groupMembersSlice.reducer;
