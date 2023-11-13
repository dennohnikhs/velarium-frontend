import { BusinessesPayload, GetBusinessesRes } from "@models/api/master";
import { Businesses } from "@models/master";
import api from "api/api";

const apiGetBusinesses = () =>
  api.get<GetBusinessesRes>("/member-business/").then((response) => response.data);

const apiGetBusinessById = (id: string) =>
  api.get<Businesses>(`/member-business/${id}/`).then((response) => response.data);

const apiAddBusiness = (business: BusinessesPayload) =>
  api.post<Businesses>("/member-business/", business).then((response) => response.data);

const apiUpdateBusiness = (business: BusinessesPayload, id: string) =>
  api.patch<Businesses>(`/member-business/${id}/`, business).then((response) => response.data);

export {
  apiGetBusinesses,
  apiAddBusiness,
  apiGetBusinessById,  
  apiUpdateBusiness,
};
