import { LineOfBusiness } from "@models/master";

export type GetLineOfBusinessRes = LineOfBusiness[];

export type LineOfBusinessPayload = {
  id?: string;
  name: string;
  description: string;
  extra_info?: string[] | number[];
};

export type GetLineOfBusinessParams = {
  insurance_id?: string;
};
