import { Permission } from "@models/access/permissions";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxGetAllPermissions,
  reduxGetSessionPermissions,
} from "store/actions/access/permissions";

type PermissionsState = {
  session: {
    data: string[];
    loading: Loading;
  };
  permissions: {
    data: Permission[];
    loading: Loading;
  };
};

const initialState: PermissionsState = {
  permissions: {
    loading: false,
    data: [],
  },
  session: {
    loading: false,
    data: [],
  },
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(reduxGetAllPermissions.pending, (state) => {
        state.permissions = {
          ...state.permissions,
          loading: true,
        };
      })
      .addCase(reduxGetAllPermissions.rejected, (state) => {
        state.permissions = {
          ...state.permissions,
          loading: "error",
        };
      })
      .addCase(reduxGetAllPermissions.fulfilled, (state, { payload }) => {
        state.permissions = {
          ...state.permissions,
          loading: "error",
          data: payload,
        };
      })

      // session permissions

      .addCase(reduxGetSessionPermissions.fulfilled, (state, { payload }) => {
        state.session = {
          ...state.session,
          loading: false,
          data: payload,
        };
      })
      .addCase(reduxGetSessionPermissions.pending, (state) => {
        state.session = {
          ...state.session,
          loading: true,
        };
      })
      .addCase(reduxGetSessionPermissions.rejected, (state) => {
        state.session = {
          ...state.session,
          loading: "error",
        };
      });
  },
});

export default permissionsSlice.reducer;
