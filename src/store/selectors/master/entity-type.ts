import { createDraftSafeSelector } from "@reduxjs/toolkit";

const entityTypeSelector = (state: State) => state.entityTypes;

const selectEntityTypes = createDraftSafeSelector(
  entityTypeSelector,
  (state) => {
    const data = state.entity_types.data ?? [];
    const loading = state.entity_types.loading;
    return { data, loading: loading === true && !data.length };
  }
);

export { selectEntityTypes };
