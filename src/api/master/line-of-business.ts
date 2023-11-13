import {
  GetLineOfBusinessRes,
  LineOfBusinessPayload,
} from "@models/api/master/line-of-business";
import { LineOfBusiness } from "@models/master/index";
import api from "api/api";

export const apiGetLineOfBusinesses = (params: { insurance_id?: string }) => {
  return api
    .get<GetLineOfBusinessRes>("/lines-of-business/", {
      params: params,
    })
    .then((response) => response.data);
};

export const apiAddLineOfBusiness = ({
  name,
  description,
  extra_info,
}: LineOfBusinessPayload) => {
  return api
    .post<LineOfBusiness>("/lines-of-business/", {
      name,
      description,
      extra_info,
    })
    .then((response) => response.data);
};

export const apiUpdateLineOfBusiness = ({
  id,
  name,
  description,
  extra_info,
}: LineOfBusinessPayload) => {
  return api
    .patch<LineOfBusiness>(`/lines-of-business/${id}/`, {
      name,
      description,
      extra_info,
    })
    .then((response) => response.data);
};

export const apiDeleteLineOfBusiness = (id: string) => {
  return api
    .delete(`/lines-of-business/${id}/`)
    .then((response) => response.data);
};
