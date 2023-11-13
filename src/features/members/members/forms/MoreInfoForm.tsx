import { RHFTextField, RHFDatePicker, RHFSelect } from "components/hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetLocations } from "store/actions/master/locations";
import { selectLocations } from "store/selectors/master/locations";

import { reduxGetIncomesources } from "store/actions/master/incomesources";
import { selectIncomesources } from "store/selectors/master/incomesources";
import { getPrefix } from "utils/functions";
import * as yup from "yup";
import { useTranslate } from "utils/useTranslation";
import { Box, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { BasicInfoValues } from "./BasicInfoForm";

const MoreInfoForm: React.FC<MoreInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const dispatch = useDispatch();
  const translate = useTranslate();
  const memberlocations = useSelector(selectLocations).data;
  const incomesources = useSelector(selectIncomesources).data;

  useEffect(() => {
    dispatch(reduxGetLocations());
    dispatch(reduxGetIncomesources());
  }, [dispatch]);

  const incomesourceidData = incomesources.map((incomesource) => ({
    label: incomesource.name,
    value: incomesource.id,
  }));
  const incomesourceidlist = {
    label: "label",
    val: "value",
    options: [...incomesourceidData],
    default: {
      label: "",
      value: "",
    },
  };

  const memberlocationidData = memberlocations.map((memberlocation) => ({
    label: memberlocation.name,
    value: memberlocation.id,
  }));

  console.log("LOCATION INFO", memberlocations);

  const memberlocationidlist = {
    label: "label",
    val: "value",
    options: [...memberlocationidData],
    default: {
      label: "",
      value: "",
    },
  };

  const genderlist = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
    { id: 3, name: "OTHER" },
  ];
  const maritalstatuslist = [
    { id: 1, name: "SINGLE" },
    { id: 2, name: "MARRIED" },
    { id: 3, name: "OTHER" },
  ];
  const remittance_methodlist = [
    { id: 1, name: "DIRECT DEPOSIT" },
    { id: 2, name: "STANDING ORDER" },
    { id: 3, name: "MPESA PAYBILL" },
    { id: 4, name: "OTHER" },
  ];

  return (
    <Box sx={{ py: 4, px: 3 }}>
      {/*<Stack direction="column" spacing={4}>*/}
      <Stack spacing={2} mt={2}>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("personal_id")}
            label={translate("members", "dialog.fields.personal_id")}
            required
          />
          <RHFTextField
            name={getName("tax_id_no")}
            label={translate("members", "dialog.fields.tax_id_no")}
            required
          />
        </Stack>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("phone_no")}
            label={translate("members", "dialog.fields.phone_no")}
            required
          />
          <RHFDatePicker
            name={getName("dob")}
            label={translate("members", "dialog.fields.dob")}
            required
          />
          <RHFTextField
            name={getName("monthly_contribution")}
            label={translate("members", "dialog.fields.monthly_contribution")}
            required
          />
        </Stack>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("postal_address")}
            label={translate("members", "dialog.fields.postal_address")}
          />
          <RHFSelect
            name={getName("member_location_id")}
            label={translate("members", "dialog.fields.member_location_id")}
            options={memberlocationidlist}
            required
          />
          <RHFSelect
            name={getName("income_source_id")}
            label={translate("members", "dialog.fields.income_source_id")}
            options={incomesourceidlist}
            required
          />
        </Stack>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFSelect
            sx={{ mt: 2 }}
            name={getName("gender")}
            label={translate("members", "dialog.fields.gender")}
            required
          >
            {genderlist.map((gender, index) => (
              <MenuItem
                key={`gender-${gender.id}-${index}`}
                value={gender.name}
              >
                {gender.name}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            sx={{ mt: 2 }}
            name={getName("marital_status")}
            label={translate("members", "dialog.fields.marital_status")}
            required
          >
            {maritalstatuslist.map((maritalstatus, index) => (
              <MenuItem
                key={`maritalstatus-${maritalstatus.id}-${index}`}
                value={maritalstatus.name}
              >
                {maritalstatus.name}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            sx={{ mt: 2 }}
            name={getName("remittance_method")}
            label={translate("members", "dialog.fields.remittance_method")}
            required
          >
            {remittance_methodlist.map((remittancemethod, index) => (
              <MenuItem
                key={`remittancemethod-${remittancemethod.id}-${index}`}
                value={remittancemethod.name}
              >
                {remittancemethod.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
      </Stack>
    </Box>
  );
};

const MoreInfoSchema = yup
  .object()
  .shape({
    phone_no: yup.string().nullable().required("DOB is required."),
    member_location_id: yup.string().nullable(),
    dob: yup.string().nullable().required("DOB is required."),
    personal_id: yup.string().nullable().required("Member ID is required."),
    tax_id_no: yup.string().nullable().required("Member ID is required."),
    gender: yup.string().nullable().required("Gender is required."),
    marital_status: yup
      .string()
      .nullable()
      .required("Marital Status is required."),
    postal_address: yup.string().nullable(),
    income_source_id: yup
      .string()
      .nullable()
      .required("Source of Income is required."),
    monthly_contribution: yup
      .string()
      .nullable()
      .required("Source of Income is required."),
    remittance_method: yup
      .string()
      .nullable()
      .required("Source of Income is required."),
  })
  .nullable();

export const MoreInfoValues: BasicInfoValues = {
  phone_no: "",
  member_location_id: "",
  dob: "",
  personal_id: "",
  tax_id_no: "",
  gender: "",
  marital_status: "",
  postal_address: "",
  income_source_id: "",
  monthly_contribution: "",
  remittance_method: "",
};

export type MoreInfoValues = {
  phone_no: string;
  member_location_id: string | null;
  dob: string;
  personal_id: string;
  tax_id_no: string;
  gender: string;
  marital_status: string;
  postal_address: string | null;
  income_source_id: string;
  monthly_contribution: string;
  remittance_method: string | null;
};
export type MoreInfoFormProps = {
  prefix?: string;
};

export { MoreInfoForm, MoreInfoSchema };
