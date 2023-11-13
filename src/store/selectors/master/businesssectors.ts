import { createDraftSafeSelector } from "@reduxjs/toolkit";

const businesssectorsSelector = (state: State) => state.businesssectors;

const selectBusinesssectors = createDraftSafeSelector(businesssectorsSelector, (state) => { 
   const loading = state.businesssectors.loading;
  const data = state.businesssectors.data ?? [];
 

  return { data, loading: loading === true && !data.length };
});

const selectBusinesssectorsById = (id: string) =>
  createDraftSafeSelector(businesssectorsSelector, (state) => {
    const data = state.businesssectors.data.find((businesssectors) => businesssectors.id === id);
    const loading = state.businesssectors.loading;
    return { data, loading: loading === true && !data };
  });
export { selectBusinesssectors, selectBusinesssectorsById};
