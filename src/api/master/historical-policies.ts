import { GetHistoricalPoliciesParams, GetHistoricalPoliciesRes } from "@models/api/master";
import api from "api/api";

export const apiGetHistoricalPolicies = (params: GetHistoricalPoliciesParams) =>
  api
    .get<GetHistoricalPoliciesRes>("/policy-information/historical/", {
      params: params
    })
    .then((response) => response.data);