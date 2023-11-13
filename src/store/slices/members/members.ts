import { Member } from "@models/members/members";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxCreateMember,
  reduxGetAllMembers,
  reduxUpdateMember,
  reduxCreateUserMember,
} from "store/actions/members/members";

const initialState: MembersState = {
  members: {
    data: [],
    loading: false,
  },
};

const members = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create user
      .addCase(reduxCreateMember.fulfilled, (state, action) => {
        state.members = {
          ...state.members,
          loading: false,
          data: [...state.members.data, action?.payload],
        };
      })
      .addCase(reduxCreateMember.pending, (state) => {
        state.members = {
          ...state.members,
          loading: true,
        };
      })
      .addCase(reduxCreateMember.rejected, (state) => {
        state.members = {
          ...state.members,
          loading: false,
        };
      })
      //update user
      .addCase(reduxUpdateMember.fulfilled, (state, action) => {
        state.members = {
          ...state.members,
          loading: false,
          data: [
            ...state.members.data.map((member) =>
              member.id !== action.payload?.id ? member : action.payload ?? member
            ),
          ],
        };
      })
      //update user status
      // .addCase(reduxUpdateUserStatus.fulfilled, (state, action) => {
      //   state.users = {
      //     ...state.users,
      //     loading: false,
      //     data: [
      //       ...state.users.data.filter(
      //         (user) => user.id !== action.payload?.id
      //       ),
      //       action?.payload,
      //     ],
      //   };
      // })
      // .addCase(reduxUpdateUserStatus.pending, (state) => {
      //   state.users = {
      //     ...state.users,
      //     loading: true,
      //   };
      // })
      // .addCase(reduxUpdateUserStatus.rejected, (state) => {
      //   state.users = {
      //     ...state.users,
      //     loading: false,
      //   };
      // })
      // get users
      .addCase(reduxGetAllMembers.fulfilled, (state, action) => {
        state.members = {
          ...state.members,
          loading: false,
          data: [...action?.payload],
        };
      })
      .addCase(reduxGetAllMembers.pending, (state) => {
        state.members = {
          ...state.members,
          loading: true,
        };
      })
      .addCase(reduxGetAllMembers.rejected, (state) => {
        state.members = {
          ...state.members,
          loading: "error",
        };
      });
  },
});

type MembersState = {
  members: {
    data: Member[];
    loading: Loading;
  };
};

export default members.reducer;
