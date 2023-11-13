import {
  Locations,
  Incomesources,
  Businesses,
  Businessectors,
  Employment,
  Entity,
  EntityMapping,
  EntityType,
  ExtraInfo,
  MasterDataSummary,
  PolicyInfo,
  PolicyInfoStatus,
  VehicleMake,
  VehicleModel,
  HistoricalPolicies,
  CancellationReason,
} from "@models/master";

export type GetLocationsRes = Locations[];

export type LocationPayload = {
  id?: string;
  name: string;
  status: string;
};

export type GetIncomesourcesRes = Incomesources[];

export type IncomesourcesPayload = {
  id?: string;
  name: string;
  status: string;
  description: string;
};

export type GetBusinessesRes = Businesses[];

export type BusinessesPayload = {
  member_id: string;
  id?: string;
  business_name: string;
  business_address: string;
  business_monthly_income: number;
  business_sector_id: string;
  business_location_id: string;
};

export type GetBusinessectorsRes = Businessectors[];

export type BusinessectorsPayload = {
  id?: string;
  name: string;
  status: string;
  description: string;
};
export type GetEmploymentRes = Employment[];

export type EmploymentPayload = {
  id?: string;
  member_id: string;
  employer_name: string;
  employer_address: string;
  employment_position: string;
  staff_no: string;
  date_employed: string;
  monthly_income: string;
};
export type CreatePaymentPayload = {
  member_id: string; 
};

////

export type GetVehicleMakeRes = VehicleMake[];

export type VehicleMakePayload = {
  id?: string;
  name: string;
};

export type GetVehicleModelRes = VehicleModel[];

export type VehicleModelPayload = {
  id?: string;
  name: string;
  make_id: string;
};

export type GetEntityTypesRes = EntityType[];

export type EntityTypePayload = {
  id?: string;
  name: string;
  description: string;
};

export type GetPolicyInfoRes = PolicyInfo[];

type ExistingPolicyInfo = {
  risk_id: string;
  status: string;
  end_date: string;
  start_date: string;
};

export type ValidatePolicyInfoRes = {
  valid: boolean;
  policy_data?: ExistingPolicyInfo;
};

export type PolicyInfoPayload = {
  id?: string;
  risk_id: string;
  status?: PolicyInfoStatus;
  policy_date_from: string;
  policy_date_to: string;
  policy_number: string;
  policy_holder: string;
  extra_info?: ExtraInfo;
  insurance_id: string;
  intermediary_id?: string;
};

export type PolicyUpdatePayload = {
  id?: string;
  status?: PolicyInfoStatus;
  cancellation_reason_id?: string;
  comment?: string;
};

export type GetEntitiesRes = Entity[];

export type EntityPayload = {
  id?: string;
  name: string;
  email: string;
  physical_address: string;
  lines_business?: string[];
  entity_type_id?: string;
};

export type GetEntityMappingsRes = EntityMapping[];

export type EntityMappingPayload = {
  insurance_id: string;
  intermediary_id: string;
  business_line_ids: string[];
};

export type GetEntityMappingsParams = {
  insurance_id?: string;
};

export type GetCancellationReasons = CancellationReason[];

export type GetMasterDataSummary = MasterDataSummary;

export type GetHistoricalPoliciesRes = HistoricalPolicies[];

export type GetHistoricalPoliciesParams = {
  entity_id: string;
  risk_id?: string;
};
