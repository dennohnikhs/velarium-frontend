export type EntityLinesOfBusiness = {
  id?: string;
  name?: string;
  email?: string;
  physical_address?: string;
  status?: string;
  logo?: null;
  insurance?: Insurance;
  intermediary?: Insurance;
  businesses: Business[];
  entity_type?: EntityType;
};

type Insurance = {
  id: string;
  name: string;
};

export type Business = {
  id: string;
  name: string;
  description: string;
  extra_info: ExtraInfo[];
  insurance_lines: null;
};

export type ExtraInfo = {
  id: number;
  name: string;
  label: string;
  type: string;
  value: string;
  width: string;
  rules: Rule[];
  options?: Option[];
};

export type Option = {
  label: string;
  value: string;
};

export type Rule = {
  type: string;
  message: string;
};

export type EntityType = {
  id: string;
  name: string;
  description: string;
};

export type EntityLinesOfBusinessParams = {
  insurance_id?: string;
  intermediary_id?: string;
};
