import { VehiclePaintType } from "@models/master";
import api from "api/api";

export const apiGetVehiclePaintTypes = () =>
  api
    .get<VehiclePaintType[]>("/vehicle/paint-type/")
    .then((response) => response.data);
