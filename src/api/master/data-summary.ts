import { GetMasterDataSummary } from "@models/api/master";
import api from "api/api";

export const apiGetMasterDataSummary = () =>
  api
    .get<GetMasterDataSummary>("/config/resource-summary/")
    .then((response) => response.data);
