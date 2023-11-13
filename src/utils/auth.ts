import { UserToken } from "@models/auth";
import jwtDecode from "jwt-decode";

export const decodeToken = (token: string | null): null | UserToken => {
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token) as UserToken;

    return decodedToken;
  } catch (e) {
    return null;
  }
};

export const isExpired = (token: string | null): boolean => {
  if (!token) return true;

  const _token = decodeToken(token);

  const now = Date.now();

  return _token.exp > now;
};
