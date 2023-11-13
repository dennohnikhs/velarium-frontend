import { createDraftSafeSelector } from "@reduxjs/toolkit";

const vehicleModelsSelector = (state: State) => state.vehicleModels;

const selectVehicleModels = createDraftSafeSelector(
  vehicleModelsSelector,
  (state) => {
    const data = state.vehicle_models.data ?? [];
    const loading = state.vehicle_models.loading;
    return { data, loading: loading === true && !data.length };
  }
);

const selectVehicleModelById = (modelId: string) =>
  createDraftSafeSelector(vehicleModelsSelector, (state) => {
    const data = state.vehicle_models.data.find(
      (model) => model.id === modelId
    );
    const loading = state.vehicle_models.loading;

    return { data, loading: loading === true && !data };
  });

const selectVehicleModelByMakeId = (makeId: string) =>
  createDraftSafeSelector(vehicleModelsSelector, (state) => {
    const data = state.vehicle_models.data.find(
      (model) => model.make_id === makeId
    );
    const loading = state.vehicle_models.loading;

    return { data, loading: loading === true && !data };
  });

export {
  selectVehicleModels,
  selectVehicleModelById,
  selectVehicleModelByMakeId,
};
