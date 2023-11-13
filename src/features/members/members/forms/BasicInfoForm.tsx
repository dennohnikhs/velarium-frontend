import { RHFTextField, RHFDatePicker, RHFSelect } from "components/hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { getPrefix } from "utils/functions";
import * as yup from "yup";
import { reduxGetLocations } from "store/actions/master/locations";
import { selectLocations } from "store/selectors/master/locations";
import { reduxGetIncomesources } from "store/actions/master/incomesources";
import { Box, MenuItem, Stack } from "@mui/material";
import { useTranslate } from "utils/useTranslation";
import { useEffect, useState } from "react";

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const translate = useTranslate();
  const dispatch = useDispatch();
  const memberlocations = useSelector(selectLocations).data;

  useEffect(() => {
    dispatch(reduxGetLocations());
    dispatch(reduxGetIncomesources());
  }, [dispatch]);

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

  return (
    <Box sx={{ py: 4, px: 3 }}>
      {/*<Stack direction="column" spacing={4}>*/}
      <Stack spacing={2} mt={2}>
        <Stack direction={"row"} spacing={2} pt={1}>
          <RHFTextField
            name={getName("first_name")}
            label={translate("members", "dialog.fields.first_name")}
            required
          />
          <RHFTextField
            name={getName("last_name")}
            label={translate("members", "dialog.fields.last_name")}
            required
          />
        </Stack>
        <Stack direction={"row"} spacing={4} pt={3} pb={3}>
          <RHFTextField
            name={getName("phone_no")}
            label={translate("members", "dialog.fields.phone_no")}
            required
          />
          <RHFSelect
            name={getName("member_location_id")}
            label={translate("members", "dialog.fields.member_location_id")}
            options={memberlocationidlist}
            required
          />
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
          <RHFDatePicker
            name={getName("dob")}
            label={translate("members", "dialog.fields.dob")}
            required
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const BasicInfoSchema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .nullable()
      .required("Member First Name is required."),
    last_name: yup
      .string()
      .nullable()
      .required("Member Last Name is required."),
    email: yup.string().nullable(),
  })
  .nullable();

export const BasicInfoValues: BasicInfoValues = {
  first_name: "",
  last_name: "",
  income_source_id: "",
  marital_status: "",
  phone_no: "",
  member_location_id: "",
  gender: "",
  dob: "",
  registration_fee_paid: "",
};

export type BasicInfoValues = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_no?: string;
  member_location_id?: string;
  dob?: string;
  personal_id?: string;
  tax_id_no?: string;
  gender?: string;
  marital_status?: string;
  postal_address?: string;
  income_source_id?: string;
  monthly_contribution?: string;
  remittance_method?: string;
  registration_fee_paid?: string;
};
export type BasicInfoFormProps = {
  prefix?: string;
};

export { BasicInfoForm, BasicInfoSchema };
