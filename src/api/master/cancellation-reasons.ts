import { GetCancellationReasons } from "@models/api/master";
import api from "api/api";

export const apiGetCancellationReasons = () =>
  api
    .get<GetCancellationReasons>("/cancellation/")
    .then((response) => response.data);
