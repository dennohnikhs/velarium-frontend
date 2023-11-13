import { Group } from "@models/access/groups";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxCreateUserGroup,
  reduxGetAllGroups,
  reduxUpdateUserGroup,
} from "store/actions/access/groups";

const initialState: UserGroupsState = {
  groups: {
    data: [],
    loading: false,
  },
};

const groups = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(reduxCreateUserGroup.fulfilled, (state, { payload }) => {
        return {
          ...state,
          groups: {
            ...state.groups,
            loading: false,
            data: [...(state.groups?.data ?? []), payload],
          },
        };
      })
      .addCase(reduxUpdateUserGroup.fulfilled, (state, { payload }) => {
        const index = state.groups?.data?.findIndex((a) => a.id === payload.id);

        if (index === -1 || index === undefined) return state;

        state.groups.data[index] = payload;

        return state;
      })

      .addCase(reduxGetAllGroups.pending, (state) => {
        state.groups.loading = true;
      })
      .addCase(reduxGetAllGroups.rejected, (state) => {
        state.groups.loading = "error";
      })
      .addCase(reduxGetAllGroups.fulfilled, (state, { payload }) => {
        state.groups = {
          ...state.groups,
          loading: false,
          data: payload,
        };
      });
  },
});

type UserGroupsState = {
  groups: {
    data: Group[];
    loading: Loading;
  };
};

export default groups.reducer;
