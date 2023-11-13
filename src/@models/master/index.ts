import { Status } from "@models";
import { Business } from "./entity-lines-of-business";


export type Locations = {
  id: string;
  name: string;
  status: string;  
};
export type Payments = {
  member_id: string;  
};

export type Incomesources = {
  id: string;
  name: string;
  status: string;  
  description: string;
};

export type Businesses = {
  id: string;
  business_name: string;
  business_address: string;
  monthly_contribution: string;
  business_sector_id: string;
};

export type Businessectors = {  
  id: string;
  name: string;
  status: string;
  description: string;
};

export type Employment = {
  id: string;
  member_id: string;
  employer_name: string;
  employer_address: string;
  employment_position: string;
  staff_no: string;
  date_employed: string;
  monthly_income: string;
};







export type VehicleMake = {
  id: string;
  name: string;
  status?: Status;
};

export type VehicleColor = {
  id: string;
  name: string;
  status?: Status;
};

export type VehiclePaintType = {
  id: string;
  name: string;
  status?: Status;
};

export type VehicleModel = {
  id: string;
  name: string;
  make_id: string;
  make?: VehicleMake;
};

export type LineOfBusiness = {
  id: string;
  name: string;
  description: string;
  extra_info: ExtraInfo;
  insurance_lines?: {
    id: string;
  };
};

export type EntityType = {
  id: string;
  name: string;
  description: string;
};

export type Entity = {
  id: string;
  name: string;
  email: string;
  physical_address: string;
  status: EntityStatus;
  logo?: string;
  businesses?: LineOfBusiness[];
  entity_type?: EntityType;
};

export type EntityStatus = Status;

export type PolicyInfo = {
  id: string;
  risk_id: string;
  status: PolicyInfoStatus;
  policy_date_from: string;
  policy_date_to: string;
  policy_number: string;
  policy_holder: string;
  extra_info: ExtraInfo;
  entity_id?: string;
  insurance?: Entity;
  intermediary?: Entity;
  cert_number?: string;
};

export type ValidatePolicyInfoParams = {
  risk_id: string;
  date_from: string;
  date_to: string;
};

export type GetPolicyInfoParams = {
  entity_id?: string;
  risk_id?: string;
  cert_number?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
};

export type GetPolicyReportInfoParams = {
  entity_id: string;
  risk_id?: string;
  is_filter: boolean;
};

export type ExtraInfo = {
  [key: string]: string;
};

export type PolicyInfoStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED"
  | "INVALID"
  | "UNINSURED";

export type EntityMapping = {
  id: string;
  insurance: {
    id: string;
    name: string;
  };
  intermediary: {
    id: string;
    name: string;
  };
  businesses: Business[];
};



export type CancellationReason = {
  id: string;
  reason: string;
};

export type PolicyInfoSummary = {
  cover_types: CoverTypes;
  intermediary: Intermediary;
};

export interface CoverTypes {
  [key: string]: number;
}

export interface Intermediary {
  [key: string]: number;
}

export type MasterDataSummary = {
  lines_of_business: number;
  insurances: number;
  intermediaries: number;
};

export type HistoricalPolicies = {
  id: string;
  risk_id: string;
  status?: PolicyInfoStatus;
  policy_date_from?: string;
  policy_date_to?: string;
  policy_number?: string;
  policy_holder?: string;
  extra_info?: ExtraInfo;
  entity_id?: string;
  insurance?: Entity;
  intermediary?: Entity;
  cert_number?: string;
};



