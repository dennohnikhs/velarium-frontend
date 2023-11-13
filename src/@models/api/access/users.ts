import { User } from "@models/access/users";

export type GetUsersResponse = User[];

export type UserPayload = {
  id?: string;
  username?: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  entity_id?: string;
};
