import { VehicleColor } from "@models/master";
import api from "api/api";

export const apiGetVehicleColors = () =>
  api.get<VehicleColor[]>("/vehicle/color/").then((response) => response.data);
