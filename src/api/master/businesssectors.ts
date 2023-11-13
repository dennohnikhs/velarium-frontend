import { BusinessectorsPayload, GetBusinessectorsRes } from "@models/api/master";
import { Businessectors } from "@models/master";
import api from "api/api";

const apiGetBusinessectors = () =>
  api.get<GetBusinessectorsRes>("/business-sector/").then((response) => response.data);

const apiGetBusinessectorsById = (id: string) =>
  api.get<Businessectors>(`/business-sector/${id}/`).then((response) => response.data);

const apiAddBusinessectors = (Businessector: BusinessectorsPayload) =>
  api.post<Businessectors>("/business-sector/", Businessector).then((response) => response.data);

const apiUpdateBusinessectors = (Businessector: BusinessectorsPayload, id: string) =>
  api.patch<Businessectors>(`/business-sector/${id}/`, Businessector).then((response) => response.data);

export {
  apiGetBusinessectors,
  apiAddBusinessectors,
  apiGetBusinessectorsById,
  apiUpdateBusinessectors,
};
