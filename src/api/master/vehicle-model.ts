import { GetVehicleModelRes, VehicleModelPayload } from "@models/api/master";
import { VehicleModel } from "@models/master";
import api from "api/api";

const apiGetVehicleModels = () =>
  api
    .get<GetVehicleModelRes>("/vehicle/model/")
    .then((response) => response.data);

const apiAddVehicleModel = (data: VehicleModelPayload) =>
  api
    .post<VehicleModel>("/vehicle/model/", data)
    .then((response) => response.data);

const apiUpdateVehicleModel = (data: VehicleModelPayload, id: string) =>
  api
    .patch<VehicleModel>(`/vehicle/model/${id}/`, data)
    .then((response) => response.data);

const apiDeleteVehicleModel = (id: string) =>
  api
    .delete<VehicleModel>(`/vehicle/model/${id}/`)
    .then((response) => response.data);

export {
  apiGetVehicleModels,
  apiAddVehicleModel,
  apiUpdateVehicleModel,
  apiDeleteVehicleModel,
};
