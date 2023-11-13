import {
  GetQRPolicyInfoParams,
  GetQRPolicyInfoRes,
} from "@models/api/comms/qr";
import api from "api/api";

export const apiGetQRPolicyInfo = (params: GetQRPolicyInfoParams) =>
  api
    .get<GetQRPolicyInfoRes>("/comms/qr/", { params: params })
    .then((response) => response.data);
