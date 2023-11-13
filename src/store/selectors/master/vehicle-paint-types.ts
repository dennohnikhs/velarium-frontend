import { createDraftSafeSelector } from "@reduxjs/toolkit";

const vehiclePaintTypesSelector = (state: State) => state.vehiclePaintTypes;

const selectVehiclePaintTypes = createDraftSafeSelector(
  vehiclePaintTypesSelector,
  (state) => {
    const data = state.vehicle_paint_types.data ?? [];
    const loading = state.vehicle_paint_types.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectVehiclePaintTypesLoading = createDraftSafeSelector(
  vehiclePaintTypesSelector,
  (state) => state.vehicle_paint_types.loading
);

export { selectVehiclePaintTypesLoading, selectVehiclePaintTypes };
