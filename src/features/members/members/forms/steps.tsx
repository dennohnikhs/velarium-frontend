import {
  BasicInfoForm,
  BasicInfoValues,
  BasicInfoSchema,
} from "./BasicInfoForm";
import { MoreInfoForm, MoreInfoValues, MoreInfoSchema } from "./MoreInfoForm";
import { DocInfoForm, DocInfoSchema } from "./DocInfoForm";
import { BusinessInfoForm, BusinessInfoSchema } from "./BusinessInfoForm";
import { EmploymentInfoForm, EmploymentInfoSchema } from "./EmploymentInfoForm";
import {
  RegistrationFeePaymentForm,
  RegistrationFeePaymentSchema,
} from "./RegistrationPayment";

export const steps = [
  {
    key: "basicinfo",
    title: "Basic Info",
    component: <BasicInfoForm />,
    schema: BasicInfoSchema,
    defaultValues: {},
  },
  {
    key: "registrationfeepayment",
    title: "Registration Fee Payment",
    component: <RegistrationFeePaymentForm />,
    schema: RegistrationFeePaymentSchema,
    defaultValues: {},
  },
  {
    key: "moreinformation",
    title: "More Information",
    component: <MoreInfoForm />,
    schema: MoreInfoSchema,
    defaultValues: {},
  },
  {
    key: "businessinformation",
    title: "Business Information",
    component: <BusinessInfoForm />,
    schema: BusinessInfoSchema,
    defaultValues: {},
  },
  {
    key: "employmentinformation",
    title: "Employment Information",
    component: <EmploymentInfoForm />,
    schema: EmploymentInfoSchema,
    defaultValues: {},
  },

  {
    key: "attachments",
    title: "Attach Documents",
    component: <DocInfoForm />,
    schema: DocInfoSchema,
    defaultValues: {},
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
  info: BasicInfoValues;
  permissions: MoreInfoValues;
};
