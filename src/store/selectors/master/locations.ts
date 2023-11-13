import { createDraftSafeSelector } from "@reduxjs/toolkit";

const locationsSelector = (state: State) => state.locations;

const selectLocations = createDraftSafeSelector(locationsSelector, (state) => {
  console.log("location has the following", state);
  const loading = state.locations.loading;
  const data = state.locations.data ?? [];

  return { data, loading: loading === true && !data.length };
});

const selectLocationsById = (id: string) =>
  createDraftSafeSelector(locationsSelector, (state) => {
    const data = state.locations.data.find((location) => location.id === id);
    const loading = state.locations.loading;
    return { data, loading: loading === true && !data };
  });
export { selectLocations, selectLocationsById };
