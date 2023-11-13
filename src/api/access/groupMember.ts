import { GroupMember } from "@models/access/groups";
import api from "api/api";

// get the group members
const apiGetGroupMembers = (group_id: string) => {
  return api
    .get<GroupMember[]>(`/groups/${group_id}/members/`)
    .then((response) => response.data);
};

const apiAddGroupMember = ({ group_id, user_id }: GroupData) => {
  return api
    .post<GroupMember>(`/groups/${group_id}/members/`, { user_id })
    .then((response) => response.data);
};

const apiDeleteGroupMember = ({ group_id, user_id }: GroupData) => {
  return api
    .delete<GroupMember[]>(`/groups/${group_id}/members/`, {
      data: {
        user_id,
      },
    })
    .then((response) => response.data);
};

export type GroupData = {
  group_id: string;
  user_id: string;
};

export { apiGetGroupMembers, apiAddGroupMember, apiDeleteGroupMember };
