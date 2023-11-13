import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { isExpired } from "utils/auth";

const authStateSelector = (state: State) => state.auth;

export const selectVerificationToken = createDraftSafeSelector(
  authStateSelector,
  (state) => {
    return {
      loading: false,
      data: null,
      ...state.verification_token,
    };
  }
);

export const selectAuthUser = createDraftSafeSelector(
  authStateSelector,
  (state) => {
    const isAuthenticated =
      !!state.access_token && !isExpired(state.access_token);

    return {
      access_token: state.access_token,
      refresh_token: state.refresh_token,
      user: state.user,
      isAuthenticated,
    };
  }
);
