import {
  GroupInfoForm,
  GroupInfoValues,
  groupInfoDefaultValues,
  groupInfoSchema,
} from "./GroupInfoForm";
import {
  GroupPermissionsForm,
  GroupPermissionsValues,
  groupPermissionsDefault,
  groupPermissionsSchema,
} from "./GroupPermissionsForm";

export const steps = [
  {
    key: "info",
    title: "Info",
    component: <GroupInfoForm />,
    schema: groupInfoSchema,
    defaultValues: groupInfoDefaultValues,
  },
  {
    key: "permissions",
    title: "Permissions",
    component: <GroupPermissionsForm />,
    schema: groupPermissionsSchema,
    defaultValues: groupPermissionsDefault,
  },
] as const;

export const defaultValues = steps.reduce((prev, current) => {
  return {
    ...prev,
    [current.key]: current.defaultValues,
  };
}, {} as Values);

export type StepType = (typeof steps)[number];
export type StepKeys = StepType["key"];

export type Values = {
  id?: string;
  info: GroupInfoValues;
  permissions: GroupPermissionsValues;
};
