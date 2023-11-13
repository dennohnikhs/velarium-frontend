import { RHFTextField, RHFDatePicker, RHFSelect } from "components/hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { getPrefix } from "utils/functions";
import * as yup from "yup";
import { reduxGetLocations } from "store/actions/master/locations";
import { selectLocations } from "store/selectors/master/locations";
import { reduxGetIncomesources } from "store/actions/master/incomesources";
import { selectIncomesources } from "store/selectors/master/incomesources";
import { Box, MenuItem, Stack } from "@mui/material";
import { useTranslate } from "utils/useTranslation";
import { useEffect, useState } from "react";
import { Row } from "jspdf-autotable";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
import Button from "theme/overrides/Button";
import { ButtonBase } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const RegistrationFeePaymentForm: React.FC<RegistrationFeePaymentFormProps> = ({
  prefix,
}) => {
  const getName = getPrefix(prefix);
  const translate = useTranslate();
  const dispatch = useDispatch();
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

  const registrationfeepaidlist = [
    { id: 1, name: "PAID" },
    { id: 2, name: "NOT PAID" },
  ];

  return (
    <Box sx={{ py: 4, px: 3 }}>
      {/*<Stack direction="column" spacing={4}>*/}
      <Stack spacing={2} mt={2}></Stack>
      <Stack direction={"row"} mt={2} spacing={5} pt={1} pt={10}>
        <Stack pt={2} fontSize={12} color={"gray"} fontWeight={200}>
          <h2>Use a diffrent phone number ?</h2>
        </Stack>
        <RHFPasswordField
          name={getName("phone_no")}
          label={translate("members", "dialog.fields.phone_no")}
        />
        <LoadingButton type="submit" variant="contained">
          Initiate Payment
        </LoadingButton>
      </Stack>
    </Box>
  );
};

const RegistrationFeePaymentSchema = yup
  .object()
  .shape({
    phone_no: yup.string().nullable(),
  })
  .nullable();

export const BasicInfoValues: BasicInfoValues = {
  income_source_id: "",
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
export type RegistrationFeePaymentFormProps = {
  prefix?: string;
};

export { RegistrationFeePaymentForm, RegistrationFeePaymentSchema };
