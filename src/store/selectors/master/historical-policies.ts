import { createDraftSafeSelector } from "@reduxjs/toolkit";

const historicalPoliciesSelector = (state: State) => state.historicalPolicies;

const selecthistoricalPolicies = createDraftSafeSelector(
    historicalPoliciesSelector,
  (state) => {
    const data = state.historical_policies.data ?? [];
    const loading = state.historical_policies.loading;
    return { data, loading: loading === true && !data.length };
  }
);

export { selecthistoricalPolicies };
