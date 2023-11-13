import { createDraftSafeSelector } from "@reduxjs/toolkit";

const incomesourcesSelector = (state: State) => state.incomesources;

const selectIncomesources = createDraftSafeSelector(incomesourcesSelector, (state) => {

  console.log('incomesources has the following', state)
   const loading = state.incomesources.loading;
  const data = state.incomesources.data ?? [];
 

  return { data, loading: loading === true && !data.length };
});

const selectincomesourcesById = (id: string) =>
  createDraftSafeSelector(incomesourcesSelector, (state) => {
    const data = state.incomesources.data.find((incomesource) => incomesource.id === id);
    const loading = state.incomesources.loading;
    return { data, loading: loading === true && !data };
  });
export { selectIncomesources, selectincomesourcesById};
