import { createDraftSafeSelector } from "@reduxjs/toolkit";

const entitiesSelector = (state: State) => state.entities;

const selectEntities = createDraftSafeSelector(entitiesSelector, (state) => {
  const data = state.entities.data ?? [];
  const loading = state.entities.loading;

  return { data, loading: loading === true && !data.length };
});

const selectEntityById = (id: string) =>
  createDraftSafeSelector(entitiesSelector, (state) => {
    const data = state.entities.data.find((entity) => entity.id === id);
    const loading = state.entities.loading;
    return { data, loading: loading === true && !data };
  });

const selectEntitiesByType = (type: "INT" | "INS") =>
  createDraftSafeSelector(entitiesSelector, (state) => {
    const data =
      type === "INS"
        ? state.entities.type.insurances
        : state.entities.type.intermediaries;
    const loading = state.entities.loading;

    return { data, loading: loading === true && !data };
  });

export { selectEntities, selectEntityById, selectEntitiesByType };
