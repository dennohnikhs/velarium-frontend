import { createDraftSafeSelector } from "@reduxjs/toolkit";

const qrPolicyInfoSelector = (state: State) => state.qrPolicyInfo;

const selectQRPolicyInfo = createDraftSafeSelector(
  qrPolicyInfoSelector,
  (state) => {
    const data = state.policy_info.data;
    const loading = state.policy_info.loading;

    return { data, loading: loading === true && !data };
  }
);

export { selectQRPolicyInfo };
