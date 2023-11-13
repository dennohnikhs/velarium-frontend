import { RHFDatePicker, RHFTextField } from "components/hook-form";
import { getPrefix } from "utils/functions";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslate } from "utils/useTranslation";
import { GroupInfoFormProps } from "features/access/groups/forms/GroupInfoForm";

const EmploymentInfoForm: React.FC<GroupInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const translate = useTranslate();

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Stack spacing={2} mt={2}>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("employer_name")}
            label={translate("members", "dialog.fields.employer_name")}
            required
          />
          <RHFTextField
            name={getName("employer_address")}
            label={translate("members", "dialog.fields.employer_address")}
          />
        </Stack>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("employment_position")}
            label={translate("members", "dialog.fields.employment_position")}
          />
          <RHFTextField
            name={getName("staff_no")}
            label={translate("members", "dialog.fields.staff_no")}
          />
        </Stack>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFDatePicker
            name={getName("date_employed")}
            label={translate("members", "dialog.fields.date_employed")}
            required
          />
          <RHFTextField
            name={getName("monthly_income")}
            label={translate("members", "dialog.fields.monthly_income")}
            required
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const EmploymentInfoSchema = yup
  .object()
  .shape({
    employer_name: yup
      .string()
      .nullable()
      .required("Employer Name is required."),
    employer_address: yup.string().nullable(),
    employment_position: yup.string().nullable(),
    staff_no: yup.string().nullable(),
    date_employed: yup.string().nullable(),
    monthly_income: yup
      .string()
      .nullable()
      .required("Monthly Income is required."),
  })
  .nullable();

export const EmploymentInfoValues: EmploymentInfoValues = {
  employer_name: "",
  employer_address: "",
  employment_position: "",
  staff_no: "",
  date_employed: "",
  monthly_income: "",
};

export type EmploymentInfoValues = {
  employer_name: string;
  employer_address: string;
  employment_position: string;
  staff_no: string;
  date_employed: string;
  monthly_income: string;
};

export type EmploymentInfoFormProps = {
  prefix?: string;
};

export { EmploymentInfoForm, EmploymentInfoSchema };
