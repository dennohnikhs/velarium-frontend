import { EntityMappingPayload, GetEntityMappingsRes } from "@models/api/master";
import { EntityMapping } from "@models/master";
import api from "api/api";

export const apiGetEntityMappings = (params: { insurance_id?: string }) =>
  api
    .get<GetEntityMappingsRes>("/entity-mapping/", {
      params: params
    })
    .then((response) => response.data);

export const apiAddEntityMapping = (data: EntityMappingPayload) =>
  api
    .post<EntityMapping>("/entity-mapping/", data)
    .then((response) => response.data);

export const apiDeleteEntityMapping = (id: string) =>
  api
    .delete<EntityMapping>(`/entity-mapping/${id}/`)
    .then((response) => response.data);
