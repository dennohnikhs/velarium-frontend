import { createDraftSafeSelector } from "@reduxjs/toolkit";

const masterDataSummarySelector = (state: State) => state.masterDataSummary;

const selectMasterDataSummary = createDraftSafeSelector(
  masterDataSummarySelector,
  (state) => {
    const data = state.masterDataSummary.data;
    const loading = state.masterDataSummary.loading;
    return { data, loading: loading === true && !data };
  }
);

export { selectMasterDataSummary };
