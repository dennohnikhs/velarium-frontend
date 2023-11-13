import { LocationPayload, GetLocationsRes } from "@models/api/master";
import { Locations } from "@models/master";
import api from "api/api";

const apiGetLocations = () =>
  api.get<GetLocationsRes>("/admin-area/").then((response) => {
    console.log(response,"responseI");
    
    return response.data
  });

const apiGetLocationById = (id: string) =>
  api.get<Locations>(`/admin-area/${id}/`).then((response) => response.data);



const apiAddLocation = (Location: LocationPayload) =>
  api.post<Locations>("/admin-area/", Location).then((response) => response.data);

const apiUpdateLocation = (Location: LocationPayload, id: string) =>
  api.patch<Locations>(`/admin-area/${id}/`, Location).then((response) => response.data);

export {
  apiGetLocations,
  apiAddLocation,
  apiGetLocationById,  
  apiUpdateLocation,
};
