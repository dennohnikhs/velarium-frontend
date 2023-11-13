import { Status } from "@models";
import { Entity } from "@models/master";

export type User = {
  id: string;
  username?: string;
  email?: string;
  status: UserStatus;
  first_name: string | null;
  last_name: string | null;
  is_superuser?: boolean;
  entity?: Entity[];
};

export type UserStatus = Status;
