
import { Group } from "@models/access/groups";

export type CreateUserGroupPayload = {
  name: string;
  description: string | null;
  permission_ids: string[];
};

export type UpdateUserGroupPayload = CreateUserGroupPayload & {
  id: string;
};

export type CreateGroupMemberPayload = {
  group_id: string;
};

export type GetAllGroupsResponse = Group[];
