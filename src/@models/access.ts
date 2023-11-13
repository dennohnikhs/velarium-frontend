// types here

import { UserStatus } from "./access/users";

export type PermissionsResponse = {
    id: string;
    app_name: string;
    active: boolean;
  };

export type GroupsResponse ={
  id: string;
  name: string;
  description: string;
}
export type UserResponse ={
  id: string;
  username: string;
  email: string;
  status: UserStatus;

}

  export {};