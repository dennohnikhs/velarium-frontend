import {
  GetVerificationTokenResponse,
  LoginPayload,
  LoginResponse,
  PasswordChangePayload,
  PasswordResetChangePayload,
  PasswordResetRequestPayload,
  PasswordResetRequestResponse,
  ResendVerificationTokenPayload,
  ResendVerificationTokenResponse,
  VerifyAccountPayload,
  VerifyAccountResponse,
} from "@models/api/auth";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiChangePassword,
  apiChangePasswordReset,
  apiGetVerificationToken,
  apiLoginUser,
  apiRefreshToken,
  apiRequestPasswordReset,
  apiResendVerificationToken,
  apiVerifyAccount,
} from "api/auth";
import { isAxiosError } from "axios";

export const reduxGetVerificationToken = createAsyncThunk<
  GetVerificationTokenResponse,
  string
>("GET_VERIFICATION_TOKEN", (token, { rejectWithValue }) => {
  return apiGetVerificationToken(token).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response?.data ?? {});

    return Promise.reject(e);
  });
});

export const reduxVerifyAccount = createAsyncThunk<
  VerifyAccountResponse,
  ReduxVerifyAccountPayload
>("VERIFY_ACCOUNT", (payload, { rejectWithValue }) => {
  const { token, ...rest } = payload;

  return apiVerifyAccount(token, rest).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue(e.response?.data ?? {});

    return Promise.reject(e);
  });
});

export const reduxResendVerificationToken = createAsyncThunk<
  ResendVerificationTokenResponse,
  ResendVerificationTokenPayload
>("RESEND_VERIFICATION_TOKEN", async (payload) => {
  return await apiResendVerificationToken(payload);
});

export const reduxLogoutUser = createAction("LOGOUT_USER");

export const reduxRefreshToken = createAsyncThunk(
  "REFRESH_TOKEN",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as State;

    if (!state.auth.refresh_token) {
      dispatch(reduxLogoutUser());
      return rejectWithValue({});
    }

    const response = await apiRefreshToken(state.auth.refresh_token);
    // if response status is not 200, reject with an empty object
    if (response.status !== 200) {
      return rejectWithValue({});
    }

    return response.data;
  }
);

export const reduxLoginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "LOGIN_USER",
  async ({ username, password }, { rejectWithValue }) => {
    return await apiLoginUser({ username, password }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxRequestPasswordReset = createAsyncThunk<
  PasswordResetRequestResponse,
  PasswordResetRequestPayload
>("PASSWORD_RESET_REQUEST", async ({ username }, { rejectWithValue }) => {
  return await apiRequestPasswordReset({ username }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue({});
    return Promise.reject(e);
  });
});

export const reduxChangePasswordReset = createAsyncThunk<
  any,
  PasswordResetChangePayload
>("RESET_PASSWORD", async ({ token, password }, { rejectWithValue }) => {
  return apiChangePasswordReset({ token, password }).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue({});
    return Promise.reject(e);
  });
});

export const reduxChangePassword = createAsyncThunk<any, PasswordChangePayload>(
  "CHANGE_PASSWORD",
  async ({ current_password, password }, { rejectWithValue }) => {
    return apiChangePassword({ current_password, password }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
      return Promise.reject(e);
    });
  }
);

//export const reduxLoginUser = createAsyncThunk("LOGIN_USER", apiLoginUser);
//types

type ReduxVerifyAccountPayload = { token: string } & VerifyAccountPayload;
