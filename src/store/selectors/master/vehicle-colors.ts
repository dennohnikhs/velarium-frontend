import { createDraftSafeSelector } from "@reduxjs/toolkit";

const vehicleColorsSelector = (state: State) => state.vehicleColors;

const selectVehicleColors = createDraftSafeSelector(
  vehicleColorsSelector,
  (state) => {
    const data = state.vehicle_colors.data ?? [];
    const loading = state.vehicle_colors.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectVehicleColorsLoading = createDraftSafeSelector(
  vehicleColorsSelector,
  (state) => state.vehicle_colors.loading
);

export { selectVehicleColorsLoading, selectVehicleColors };
