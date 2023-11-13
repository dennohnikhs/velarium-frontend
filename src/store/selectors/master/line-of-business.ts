import { createDraftSafeSelector } from "@reduxjs/toolkit";

const lineOfBusinessSelector = (state: State) => state.lineOfBusiness;

const selectLineOfBusinesses = createDraftSafeSelector(
  lineOfBusinessSelector,
  (state) => {
    const data = state.lineOfBusiness.data ?? [];
    const loading = state.lineOfBusiness.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectLineOfBusiness = (id: string) => {
  return createDraftSafeSelector(lineOfBusinessSelector, (state) => {
    return state.lineOfBusiness.data.find((lob) => lob.id === id);
  });
};

export { selectLineOfBusiness, selectLineOfBusinesses };
