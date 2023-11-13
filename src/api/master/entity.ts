import { EntityPayload, GetEntitiesRes } from "@models/api/master";
import { Entity } from "@models/master";
import api from "api/api";

const apiGetEntities = () =>
  api.get<GetEntitiesRes>("/entity/").then((response) => response.data);

const apiGetEntityById = (id: string) =>
  api.get<Entity>(`/entity/${id}/`).then((response) => response.data);

const apiGetEntitiesByType = (type: "INT" | "INS") =>
  api
    .get<GetEntitiesRes>(`/entity/by_type/${type}`)
    .then((response) => response.data);

const apiAddEntity = (entity: EntityPayload) =>
  api.post<Entity>("/entity/", entity).then((response) => response.data);

const apiUpdateEntity = (entity: EntityPayload, id: string) =>
  api.patch<Entity>(`/entity/${id}/`, entity).then((response) => response.data);

export {
  apiGetEntities,
  apiAddEntity,
  apiGetEntityById,
  apiGetEntitiesByType,
  apiUpdateEntity,
};
