import {
  GetPolicyInfoRes,
  PolicyInfoPayload,
  PolicyUpdatePayload,
  ValidatePolicyInfoRes,
} from "@models/api/master";
import {
  GetPolicyInfoParams,
  PolicyInfo,
  PolicyInfoSummary,
  ValidatePolicyInfoParams,
} from "@models/master";
import api from "api/api";

export const apiGetAllPolicyInfo = (params: GetPolicyInfoParams) =>
  api
    .get<GetPolicyInfoRes>("/policy-information/", {
      params: params,
    })
    .then((response) => response.data);

export const apiAddPolicyInfo = (data: PolicyInfoPayload) =>
  api
    .post<PolicyInfo>("/policy-information/", data)
    .then((response) => response.data);

export const apiValidatePolicyInfo = (params: ValidatePolicyInfoParams) =>
  api
    .get<ValidatePolicyInfoRes>(`/policy-information/validate/`, {
      params: params,
    })
    .then((response) => response.data);

export const apiUpdatePolicyInfo = ({
  id,
  status,
  cancellation_reason_id,
  comment,
}: PolicyUpdatePayload) =>
  api
    .patch<PolicyInfo>(`/policy-information/${id}/`, {
      status,
      cancellation_reason_id,
      comment,
    })
    .then((response) => response.data);

export const apiGetPolicyInfoSummary = (insurance_id) =>
  api
    .get<PolicyInfoSummary>("/policy-information/summary/", {
      params: { insurance_id },
    })
    .then((response) => response.data);
