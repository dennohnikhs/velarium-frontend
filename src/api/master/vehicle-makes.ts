import { GetVehicleMakeRes, VehicleMakePayload } from "@models/api/master";
import { VehicleMake } from "@models/master";
import api from "api/api";

const apiGetVehicleMakes = () =>
  api
    .get<GetVehicleMakeRes>("/vehicle/make/")
    .then((response) => response.data);

const apiAddVehicleMake = ({ name }: VehicleMakePayload) =>
  api
    .post<VehicleMake>("/vehicle/make/", { name })
    .then((response) => response.data);

const apiUpdateVehicleMake = ({ name, id }: VehicleMakePayload) =>
  api
    .patch<VehicleMake>(`/vehicle/make/${id}/`, { name })
    .then((response) => response.data);

const apiDeleteVehicleMake = (id: string) =>
  api.delete(`/vehicle/make/${id}/`).then((response) => response.data);

export {
  apiGetVehicleMakes,
  apiAddVehicleMake,
  apiUpdateVehicleMake,
  apiDeleteVehicleMake,
};
