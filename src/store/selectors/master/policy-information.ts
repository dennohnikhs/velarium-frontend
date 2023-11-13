import { createDraftSafeSelector } from "@reduxjs/toolkit";

const policyInfoSelector = (state: State) => state.policyInfo;

const selectAllPolicyInfo = createDraftSafeSelector(
  policyInfoSelector,
  (state) => {
    const data = state.policy_info.data ?? [];
    const loading = state.policy_info.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectAllPolicyInfoLoading = createDraftSafeSelector(
  policyInfoSelector,
  (state) => state.policy_info.loading
);

const selectValidatedPolicyInfo = createDraftSafeSelector(
  policyInfoSelector,
  (state) => {
    const isValidated = state.policy_info.validated.valid;

    return { isValidated };
  }
);

const selectPolicyInfoSummary = createDraftSafeSelector(
  policyInfoSelector,
  (state) => {
    const intermediaries = state.policy_info.summary?.intermediary;
    const cover_types = state.policy_info.summary?.cover_types;
    const loading = state.policy_info.loading;

    return { intermediaries, cover_types, loading };
  }
);

export {
  selectAllPolicyInfoLoading,
  selectAllPolicyInfo,
  selectValidatedPolicyInfo,
  selectPolicyInfoSummary,
};
