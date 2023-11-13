import {
  GetVerificationTokenResponse,
  LoginPayload,
  LoginResponse,
  PasswordChangePayload,
  PasswordResetChangePayload,
  PasswordResetRequestPayload,
  PasswordResetRequestResponse,
  RefreshTokenResponse,
  ResendVerificationTokenPayload,
  ResendVerificationTokenResponse,
  VerifyAccountPayload,
  VerifyAccountResponse,
} from "@models/api/auth";
import api from "./api";

export const apiGetVerificationToken = (token: string) => {
  return api
    .get<GetVerificationTokenResponse>(`/verify/${token}/`)
    .then((response) => response.data);
};

export const apiVerifyAccount = (
  token: string,
  { password }: VerifyAccountPayload
) =>
  api
    .post<VerifyAccountResponse>(`/verify/${token}/verify/`, { password })
    .then((response) => response.data);

export const apiResendVerificationToken = (
  data: ResendVerificationTokenPayload
) =>
  api
    .post<ResendVerificationTokenResponse>(
      `/verify/${data.token}/resend/`,
      data
    )
    .then((response) => response.data);

export const apiRefreshToken = (refresh: string) =>
  api.post<RefreshTokenResponse>("/login/refresh/", {
    refresh,
  });

export const apiLoginUser = (data: LoginPayload) =>
  api
    .post<LoginResponse>("/token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data);

export const apiRequestPasswordReset = (data: PasswordResetRequestPayload) => {
  return api
    .post<PasswordResetRequestResponse>("/password/reset/", data)
    .then((response) => response.data);
};

export const apiChangePasswordReset = (data: PasswordResetChangePayload) =>
  api
    .post<any>("/password/reset/change/", data)
    .then((response) => response.data);

export const apiChangePassword = (data: PasswordChangePayload) =>
  api.post<any>("/password/change/", data).then((response) => response.data);
