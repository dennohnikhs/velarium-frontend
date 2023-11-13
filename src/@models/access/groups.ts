// types here

export type GroupMember = {
  id: string;
  name: string;
  username?: string;
  group_id: string;
  user_id?: string;
};

export type Group = {
  id: string;
  name: string;
  description: string | null;
  permission_ids: string[];
};
