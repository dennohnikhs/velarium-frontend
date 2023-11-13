import { RHFUploadSingleFile } from "components/hook-form";
import { getPrefix } from "utils/functions";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslate } from "utils/useTranslation";
import { GroupInfoFormProps } from "features/access/groups/forms/GroupInfoForm";
import { BasicInfoValues } from "./BasicInfoForm";

const DocInfoForm: React.FC<GroupInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const translate = useTranslate();

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Stack spacing={2} mt={2}>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFUploadSingleFile
            name={getName("IDdoc")}
            label={translate("members", "dialog.fields.IDdoc")}
          />
          <RHFUploadSingleFile
            name={getName("passportdoc")}
            label={translate("members", "dialog.fields.passportdoc")}
          />
          <RHFUploadSingleFile
            name={getName("krapindoc")}
            label={translate("members", "dialog.fields.krapindoc")}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const DocInfoSchema = yup
  .object()
  .shape({
    IDdoc: yup.string().nullable(),
    passportdoc: yup.string().nullable(),
    krapindoc: yup.string().nullable(),
  })
  .nullable();

export const DocInfoValues: any = {
  IDdoc: "",
  passportdoc: "",
  krapindoc: "",
};

export type DocInfoValues = {
  IDdoc: string;
  passportdoc: string | null;
  krapindoc: string | null;
};
export type DocInfoFormProps = {
  prefix?: string;
};

export { DocInfoForm, DocInfoSchema };
