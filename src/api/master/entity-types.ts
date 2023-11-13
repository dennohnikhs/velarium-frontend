import { EntityType } from "@models/master";
import { EntityTypePayload, GetEntityTypesRes } from "@models/api/master";
import api from "api/api";

export const apiGetEntityTypes = () =>
  api.get<GetEntityTypesRes>("/entity-type/").then((response) => response.data);

export const apiGetEntityType = (id: string) =>
  api.get<EntityType>(`/entity-type/${id}/`).then((response) => response.data);

export const apiAddEntityType = (data: EntityTypePayload) =>
  api.post<EntityType>("/entity-type/", data).then((response) => response.data);

export const apiUpdateEntityType = (data: EntityTypePayload, id: string) =>
  api
    .patch<EntityType>(`/entity-type/${id}/`, data)
    .then((response) => response.data);

export const apiDeleteEntityType = (id: string) =>
  api
    .delete<EntityType>(`/entity-type/${id}/`)
    .then((response) => response.data);
