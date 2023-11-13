import {
  PermissionsResponse,
  SessionPermissionsResponseponse,
} from "@models/api/access/permissions";
import api from "api/api";

export const apiGetSessionPermissions = () =>
  api
    .get<SessionPermissionsResponseponse>("/permissions/session/")
    .then((response) => response.data);

export const apiGetAllPermissions = () =>
  api
    .get<PermissionsResponse>("/permissions/")
    .then((response) => response.data);
