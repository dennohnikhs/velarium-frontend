import { RHFTextField, RHFSelect } from "components/hook-form";
import { getPrefix } from "utils/functions";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetLocations } from "store/actions/master/locations";
import { selectLocations } from "store/selectors/master/locations";
import { selectBusinesssectors } from "store/selectors/master/businesssectors";
import { reduxGetBusinesssectors } from "store/actions/master/businessectors";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslate } from "utils/useTranslation";
import { useEffect } from "react";

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ prefix }) => {
  const getName = getPrefix(prefix);
  const dispatch = useDispatch();
  const translate = useTranslate();
  const businesslocations = useSelector(selectLocations).data;
  const businesssectors = useSelector(selectBusinesssectors).data;

  useEffect(() => {
    dispatch(reduxGetLocations());
    dispatch(reduxGetBusinesssectors());
  }, [dispatch]);

  const businesssectoridData = businesssectors.map((businesssector) => ({
    label: businesssector.name,
    value: businesssector.id,
  }));

  const businesssectoridlist = {
    label: "label",
    val: "value",
    options: businesssectoridData,
    default: {
      label: "",
      value: "",
    },
  };

  const businesslocationidData = businesslocations.map((businesslocation) => ({
    label: businesslocation.name,
    value: businesslocation.id,
  }));

  const businesslocationidlist = {
    label: "label",
    val: "value",
    options: businesslocationidData,
    default: {
      label: "",
      value: "",
    },
  };

  return (
    <>
      {businesslocations && businesssectors && (
        <Box sx={{ py: 4, px: 3 }}>
          <Stack spacing={2} mt={2}>
            <Stack direction={"row"} spacing={2} pt={1}>
              <RHFTextField
                name={getName("business_name")}
                label={translate("members", "dialog.fields.business_name")}
                required
              />
              <RHFTextField
                name={getName("business_address")}
                label={translate("members", "dialog.fields.business_address")}
                required
              />
              <RHFSelect
                name={getName("business_sector_id")}
                label={translate("members", "dialog.fields.business_sector_id")}
                options={businesssectoridlist}
                required
              />
            </Stack>
            <Stack direction={"row"} spacing={2} pt={1}>
              <RHFSelect
                name={getName("business_location_id")}
                label={translate(
                  "members",
                  "dialog.fields.business_location_id"
                )}
                options={businesslocationidlist}
                required
              />
              <RHFTextField
                name={getName("monthly_contribution")}
                label={translate(
                  "members",
                  "dialog.fields.monthly_contribution"
                )}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

const BusinessInfoSchema = yup
  .object()
  .shape({
    business_name: yup
      .string()
      .nullable()
      .required("Member Fisrt Name is required."),
    business_address: yup.string().nullable().required("Address is required."),
    business_monthly_income: yup.string().nullable(),
    business_sector_id: yup.string().nullable(),
    business_location_id: yup.string().required("Required"),
  })
  .nullable();

export const BusinessInfoValues: BusinessInfoValues = {
  business_name: "",
  business_address: "",
  monthly_contribution: "",
  business_sector_id: "",
  business_location_id: "",
};

export type BusinessInfoValues = {
  business_name: string;
  business_address: string;
  monthly_contribution: string;
  business_sector_id: string;
  business_location_id: string;
};
export type BusinessInfoFormProps = {
  prefix?: string;
};

export { BusinessInfoForm, BusinessInfoSchema };
