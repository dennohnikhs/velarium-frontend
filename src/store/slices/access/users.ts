import { User } from "@models/access/users";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxCreateUser,
  reduxGetUsers,
  reduxUpdateUser,
  reduxUpdateUserStatus,
} from "store/actions/access/users";

const initialState: UsersState = {
  users: {
    data: [],
    loading: false,
  },
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create user
      .addCase(reduxCreateUser.fulfilled, (state, action) => {
        state.users = {
          ...state.users,
          loading: false,
          data: [...state.users.data, action?.payload],
        };
      })
      .addCase(reduxCreateUser.pending, (state) => {
        state.users = {
          ...state.users,
          loading: true,
        };
      })
      .addCase(reduxCreateUser.rejected, (state) => {
        state.users = {
          ...state.users,
          loading: false,
        };
      })
      //update user
      .addCase(reduxUpdateUser.fulfilled, (state, action) => {
        state.users = {
          ...state.users,
          loading: false,
          data: [
            ...state.users.data.map((user) =>
              user.id !== action.payload?.id ? user : action.payload ?? user
            ),
          ],
        };
      })
      //update user status
      .addCase(reduxUpdateUserStatus.fulfilled, (state, action) => {
        state.users = {
          ...state.users,
          loading: false,
          data: [
            ...state.users.data.filter(
              (user) => user.id !== action.payload?.id
            ),
            action?.payload,
          ],
        };
      })
      .addCase(reduxUpdateUserStatus.pending, (state) => {
        state.users = {
          ...state.users,
          loading: true,
        };
      })
      .addCase(reduxUpdateUserStatus.rejected, (state) => {
        state.users = {
          ...state.users,
          loading: false,
        };
      })
      // get users
      .addCase(reduxGetUsers.fulfilled, (state, action) => {
        state.users = {
          ...state.users,
          loading: false,
          data: [...action?.payload],
        };
      })
      .addCase(reduxGetUsers.pending, (state) => {
        state.users = {
          ...state.users,
          loading: true,
        };
      })
      .addCase(reduxGetUsers.rejected, (state) => {
        state.users = {
          ...state.users,
          loading: "error",
        };
      });
  },
});

type UsersState = {
  users: {
    data: User[];
    loading: Loading;
  };
};

export default users.reducer;
