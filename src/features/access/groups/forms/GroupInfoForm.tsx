import { RHFTextField } from "components/hook-form";
import { getPrefix } from "utils/functions";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslate } from "utils/useTranslation";

const GroupInfoForm: React.FC<GroupInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const translate = useTranslate();

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Stack direction="column" spacing={4}>
        <RHFTextField name={getName("name")} label={translate("groups", "dialog.fields.name")} required />
        <RHFTextField
          name={getName("description")}
          label={translate("groups", "dialog.fields.description")}
          multiline
          minRows={5}
        />
      </Stack>
    </Box>
  );
};

const groupInfoSchema = yup
  .object()
  .shape({
    name: yup.string().nullable().required("Group name is required."),
    description: yup.string().nullable(),
  })
  .nullable();

export const groupInfoDefaultValues: GroupInfoValues = {
  name: "",
  description: "",
};

export type GroupInfoValues = {
  name: string;
  description: string | null;
};
export type GroupInfoFormProps = {
  prefix?: string;
};

export { GroupInfoForm, groupInfoSchema };
