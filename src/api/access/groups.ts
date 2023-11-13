import {
  CreateUserGroupPayload,
  GetAllGroupsResponse,
  UpdateUserGroupPayload,
} from "@models/api/access/groups";
import api from "api/api";

export const apiCreateUserGroup = (data: CreateUserGroupPayload) =>
  api.post("/groups/", data).then((a) => a.data);

export const apiUpdateUserGroup = (data: UpdateUserGroupPayload) =>
  api.patch(`/groups/${data.id}/`, data).then((a) => a.data);

export const apiGetAllGroups = () =>
  api.get<GetAllGroupsResponse>("/groups/").then((data) => data.data);
