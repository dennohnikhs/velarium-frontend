import { createDraftSafeSelector } from "@reduxjs/toolkit";

const entityLinesOfBusinessSelector = (state: State) =>
  state.entityLineOfBusinesses;

const selectEntityLineOfBusiness = createDraftSafeSelector(
  entityLinesOfBusinessSelector,
  (state) => {
    const data = state.entityLinesOfBusiness.data ?? [];
    const loading = state.entityLinesOfBusiness.loading;
    return { data, loading: loading === true && !data.length };
  }
);

export { selectEntityLineOfBusiness };
