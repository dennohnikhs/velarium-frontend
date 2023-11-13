import { User } from "@models/access/users";
import { VerificationTokenStatus, VerificationTokenType } from "@models/auth";

export type GetVerificationTokenResponse = {
  status: VerificationTokenStatus;
  type?: VerificationTokenType;
  expiry: string;
  is_expired: boolean;
  can_resend: boolean;
  remaining_minutes: number;
};

export type VerifyAccountPayload = {
  username?: string;
  password: string;
  confirm_password?: string;
  type?: VerificationTokenType;
};

export type RefreshTokenResponse = {
  refresh: string;
  access: string;
};

export type ResendVerificationTokenPayload = {
  token: string;
  type: VerificationTokenType;
};

export type ResendVerificationTokenResponse = GetVerificationTokenResponse & {
  date_created?: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  refresh_token: string;
  access_token: string;
  token_type: string;
  user: User;
};

export type PasswordResetRequestPayload = {
  username: string;
};

export type PasswordResetRequestResponse = {
  status: VerificationTokenStatus;
  type: VerificationTokenType;
  expiry: string;
  is_expired: boolean;
  can_resend: boolean;
  remaining_minutes: number;
};

export type PasswordResetChangePayload = {
  token: string;
  password: string;
};

export type PasswordResetChangeResponse = {};

export type PasswordChangePayload = {
  current_password: string;
  password: string;
};

export type PasswordChangeResponse = {};

export type VerifyAccountResponse = GetVerificationTokenResponse;
