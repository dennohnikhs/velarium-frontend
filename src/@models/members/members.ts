// types here

export type UserMember = {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
};

export type Member = {
  id?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  status?: string;
  user_id?: string;
  sacco_id?: string;
  member_location_id?: string;
  dob?: string;
  personal_id?: string;
  tax_id_no?: string | null;
  phone_no?: string;
  gender?: string;
  marital_status?: string;
  postal_address?: string | null;
  income_source_id?: string;
  monthly_contribution?: string;
  remittance_method?: string;
};
