import { IncomesourcesPayload, GetIncomesourcesRes } from "@models/api/master";
import { Incomesources } from "@models/master";
import api from "api/api";

const apiGetIncomesources = () =>
  api.get<GetIncomesourcesRes>("/income-source/").then((response) => response.data);

const apiGetIncomesourcesById = (id: string) =>
  api.get<Incomesources>(`/income-source/${id}/`).then((response) => response.data);

const apiAddIncomesources = (Incomesource: IncomesourcesPayload) =>
  api.post<Incomesources>("/income-source/", Incomesource).then((response) => response.data);

const apiUpdateIncomesources = (Incomesource: IncomesourcesPayload, id: string) =>
  api.patch<Incomesources>(`/income-source/${id}/`, Incomesource).then((response) => response.data);

export {
  apiGetIncomesources,
  apiAddIncomesources,
  apiGetIncomesourcesById,  
  apiUpdateIncomesources,
};
