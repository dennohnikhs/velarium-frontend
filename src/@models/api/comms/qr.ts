import { QRPolicyInfo } from "@models/comms/qr";

export type GetQRPolicyInfoRes = QRPolicyInfo;

export type GetQRPolicyInfoParams = {
  cert_number: string;
};
