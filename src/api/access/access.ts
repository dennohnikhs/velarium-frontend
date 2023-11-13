import { GroupsResponse } from "@models/access";
import { SessionPermissionsResponse } from "@models/access/access";
import api from "../api";
/**
 * all functions here, must be prefixed with api
 * example below
 */

// fetch all groups
const apiGetGroups = () => {
  return api
    .get<GroupsResponse[]>("/groups/")
    .then((response) => response.data);
};

const apiCreateRole = () =>
  api.post("/roles", {
    name: "something",
  });

const apiGetSessionPermissions = () => {
  return api
    .get<SessionPermissionsResponse>("/permissions/session/")
    .then((response) => response.data);
};

export { apiCreateRole, apiGetSessionPermissions, apiGetGroups };
