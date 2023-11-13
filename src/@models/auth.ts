export type VerificationTokenStatus = "FACED_OUT" | "UNUSED" | "USED";
export type VerificationTokenType = "INITIAL_VERIFICATION" | "PASSWORD_RESET";

export type UserToken = {
  user_id: string;
  exp: number;
  type: UserTokenType;
};

export type UserTokenType = "access" | "refresh";
