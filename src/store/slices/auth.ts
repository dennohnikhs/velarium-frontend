import { User } from "@models/access/users";
import { GetVerificationTokenResponse } from "@models/api/auth";
import { VerificationTokenType } from "@models/auth";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxChangePassword,
  reduxGetVerificationToken,
  reduxLoginUser,
  reduxLogoutUser,
  reduxRefreshToken,
  reduxRequestPasswordReset,
  reduxResendVerificationToken,
} from "store/actions/auth";

type AuthState = {
  user: null | User;
  access_token: null | string;
  refresh_token: null | string;
  verification_token: {
    loading: Loading;
    data:
      | (GetVerificationTokenResponse & {
          type?: VerificationTokenType;
          resending?: Loading;
        })
      | null;
  };
};

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  verification_token: {
    loading: false,
    data: null,
  },
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Get verification token
      .addCase(reduxGetVerificationToken.fulfilled, (state, { payload }) => {
        state.verification_token = {
          ...state.verification_token,
          data: payload,
          loading: false,
        };
        return state;
      })

      .addCase(reduxGetVerificationToken.pending, (state) => {
        state.verification_token = {
          ...state.verification_token,
          loading: true,
          data: null,
        };
      })
      .addCase(reduxGetVerificationToken.rejected, (state) => {
        state.verification_token = {
          ...state.verification_token,
          data: null,
          loading: "error",
        };
      })

      // Resend verification token
      .addCase(reduxResendVerificationToken.pending, (state) => {
        if (state.verification_token) {
          state.verification_token.data.resending = true;
        }
      })
      .addCase(reduxResendVerificationToken.rejected, (state) => {
        if (state.verification_token) {
          state.verification_token.data.resending = "error";
        }
      })
      .addCase(reduxResendVerificationToken.fulfilled, (state, { payload }) => {
        state.verification_token = {
          data: payload,
          loading: false,
        };
      })

      // Login and refresh tokens below
      .addCase(
        reduxRefreshToken.fulfilled,
        (state, { payload: { access, refresh } }) => {
          state.access_token = access;
          state.refresh_token = refresh;
        }
      )
      .addCase(reduxLoginUser.fulfilled, (state, { payload }) => {
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.user = payload.user;
      })
      // Logout user
      .addCase(reduxLogoutUser, (state) => {
        state.access_token = null;
        state.refresh_token = null;
        state.user = null;
      })
      // Request password reset
      .addCase(reduxRequestPasswordReset.fulfilled, (state, { payload }) => {
        state.verification_token = {
          data: payload,
          loading: false,
        };
      })
      .addCase(reduxRequestPasswordReset.pending, (state) => {
        state.verification_token = {
          ...state.verification_token,
          loading: true,
        };
      })
      .addCase(reduxRequestPasswordReset.rejected, (state) => {
        state.verification_token = {
          ...state.verification_token,
          data: null,
          loading: "error",
        };
      })
      // Change password
      .addCase(reduxChangePassword.fulfilled, (state, { payload }) => {
        // do something here
        console.log(payload);
      })
      .addCase(reduxChangePassword.pending, () => {
        // do something here
      })
      .addCase(reduxChangePassword.rejected, (state, { payload }) => {
        // do something here
        console.log(payload);
      });
  },
});

export default auth.reducer;
