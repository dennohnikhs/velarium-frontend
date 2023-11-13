import { Member } from "@models/members/members";

export type CreateUserMemberPayload = {
  first_name: string;
  last_name: string;
  // email: string;
  id?: any;
};
export type CreateMemberPayload = {
  id?: any;
  user_id: string;
  sacco_id: string;
  member_location_id: string;
  dob: string;
  personal_id: string;
  tax_id_no: string | null;
  phone_no: string;
  gender: string;
  marital_status: string;
  postal_address: string | null;
  income_source_id: string;
  monthly_contribution: string;
  remittance_method: string;
  status?: string;
};

export type UpdateMemberPayload = CreateMemberPayload & {
  id: string;
};

export type GetAllMemberResponse = Member[];
