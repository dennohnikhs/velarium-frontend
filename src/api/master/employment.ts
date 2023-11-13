import { EmploymentPayload, GetEmploymentRes } from "@models/api/master";
import { Employment } from "@models/master";
import api from "api/api";

const apiGetEmployment = () =>
  api
    .get<GetEmploymentRes>("/member-employment/")
    .then((response) => response.data);

const apiGetEmploymentById = (id: string) =>
  api
    .get<Employment>(`/member-employment/${id}/`)
    .then((response) => response.data);

const apiAddEmployment = (employment: EmploymentPayload) => {
  console.log("==================");

  console.log(employment);

  console.log("==================");

  return api
    .post<Employment>("/member-employment/", employment)
    .then((response) => response.data);
};

const apiUpdateEmployment = (employment: EmploymentPayload, id: string) =>
  api
    .patch<Employment>(`/member-employment/${id}/`, employment)
    .then((response) => response.data);

export {
  apiGetEmployment,
  apiAddEmployment,
  apiGetEmploymentById,
  apiUpdateEmployment,
};
