import {
  CreateUserMemberPayload,
  CreateMemberPayload,
  GetAllMemberResponse,
  UpdateMemberPayload,
} from "@models/api/members/members";
import api from "api/api";

export const apiCreateUserMember = (data: CreateUserMemberPayload) => 
  api.post("/users/", data).then((response) => response.data);

export const apiCreateMember = (data: CreateMemberPayload) =>
  api.post("/member/", data).then((a) => a.data);

  //not using

export const apiUpdateUserMember = (data: UpdateMemberPayload) =>
  api.patch(`/member/${data.id}/`, data).then((a) => a.data);

export const apiGetAllMembers = () =>
  api.get<GetAllMemberResponse>("/member/").then((data) => data.data);
