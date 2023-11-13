import {
  EntityLinesOfBusiness,
  EntityLinesOfBusinessParams,
} from "@models/master/entity-lines-of-business";
import api from "api/api";

export const apiGetEntityLinesOfBusiness = (
  params: EntityLinesOfBusinessParams
) =>
  api
    .get<EntityLinesOfBusiness>("/entity-mapping/business/", { params: params })
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response.data[0].businesses;
      }
      return response.data.businesses;
    });
