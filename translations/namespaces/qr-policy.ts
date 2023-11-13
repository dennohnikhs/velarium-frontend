const qrPolicy = {
  risk: "Risk ID",
  certificate: "Certificate No.",
  policy_status: {
    title: "Status",
    active: "active",
    cancelled: "cancelled",
    inactive: "inactive",
    expired: "expired",
  },
  period: {
    title: "Period",
    to: "to",
  },
  not_found: "Sorry, the policy you were searching for could not be found",
};

export type QRPolicyNamespace = typeof qrPolicy;
export default qrPolicy;
