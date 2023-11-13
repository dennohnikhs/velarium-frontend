import { createDraftSafeSelector } from "@reduxjs/toolkit";

const vehicleMakesSelector = (state: State) => state.vehicleMakes;

const selectVehicleMakes = createDraftSafeSelector(
  vehicleMakesSelector,
  (state) => {
    const data = state.vehicle_makes.data ?? [];
    const loading = state.vehicle_makes.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectVehicleMakesLoading = createDraftSafeSelector(
  vehicleMakesSelector,
  (state) => state.vehicle_makes.loading
);

export { selectVehicleMakesLoading, selectVehicleMakes };
