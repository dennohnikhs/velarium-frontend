import { isRejected } from "@reduxjs/toolkit";
import api from "api/api";
import { AxiosError } from "axios";
import memoize from "fast-memoize";
import pMemoize from "p-memoize";
import { useEffect } from "react";
import { useDispatch } from "store";
import { reduxLogoutUser, reduxRefreshToken } from "store/actions/auth";
import useAuth from "./useAuth";

const memoizedReduxRefreshToken = pMemoize((_: string) =>
  useDispatch()(reduxRefreshToken())
);

const memoizedReduxLogoutUser = memoize((_: string) =>
  useDispatch()(reduxLogoutUser())
);

const requestInterceptor = (
  access_token: string | null,
  lang: string | null
  //refresh_token: string | null
) => {
  return api.interceptors.request.use((config) => {
    if (access_token) config.headers.setAuthorization(`Bearer ${access_token}`);
    if (lang) config.headers["Accept-Language"] = `${lang}`;
    return config;
  });
};

const getLocale = () => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "NEXT_LOCALE") {
      return value;
    }
  }
};

const responseInterceptor = (refresh_token: string | null) => {
  return api.interceptors.response.use(null, async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && refresh_token && !error.config?.retry) {
      const response = await memoizedReduxRefreshToken(refresh_token);

      if (isRejected(response)) {
        // Logout the user if getting refresh token failed and return the received error response
        memoizedReduxLogoutUser(refresh_token);

        return Promise.reject(error);
      }

      // Retry the request if a refresh token was obtained successfully
      return api({
        ...error.config,
        retry: true,
        headers: {
          ...error.config.headers,
          Authorization: `Bearer ${response.payload.access}`,
        },
      });
    }

    return Promise.reject(error);
  });
};

const useInterceptorEffect = () => {
  const { access_token, refresh_token } = useAuth();
  //const { access_token, refresh_token } = store.getState().auth;
  const dispatch = useDispatch();
  const lang = getLocale() || "en";

  useEffect(() => {
    const request = requestInterceptor(access_token, lang);
    const response = responseInterceptor(refresh_token);

    return () => {
      api.interceptors.request.eject(request);
      api.interceptors.response.eject(response);
    };
  }, [access_token, refresh_token, dispatch, lang]);
};

declare module "axios" {
  export interface AxiosRequestConfig {
    retry?: true;
  }
}
export default useInterceptorEffect;
