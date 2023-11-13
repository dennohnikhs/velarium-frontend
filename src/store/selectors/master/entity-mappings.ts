import { createDraftSafeSelector } from "@reduxjs/toolkit";

const entityMappingSelector = (state: State) => state.entityMappings;

const selectEntityMappings = createDraftSafeSelector(
  entityMappingSelector,
  (state) => {
    const data = state.entity_mappings.data ?? [];
    const loading = state.entity_mappings.loading;
    return { data, loading: loading === true && !data.length };
  }
);

export { selectEntityMappings };
