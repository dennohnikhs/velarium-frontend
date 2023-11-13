import { User, UserStatus } from "@models/access/users";
import { GetUsersResponse, UserPayload } from "@models/api/access/users";
import api from "api/api";

const apiCreateUser = (data: UserPayload) => {
  return api.post<User>("/users/", data).then((response) => response.data);
};

const apiGetUsers = () => {
  return api.get<GetUsersResponse>("/users/").then((response) => response.data);
};

const apiUpdateUser = (data: UserPayload) => {
  return api
    .put<User>(`/users/${data.id}/`, data)
    .then((response) => response.data);
};

const apiUpdateUserStatus = ({
  user_id,
  status,
}: {
  user_id: string;
  status: UserStatus;
}) => {
  return api
    .put(`/users/${user_id}/status/`, status)
    .then((response) => response.data);
};

export { apiCreateUser, apiGetUsers, apiUpdateUser, apiUpdateUserStatus };
