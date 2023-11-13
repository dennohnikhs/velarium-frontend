import { GetPolicyInfoParams } from "@models/master";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import useAuth from "hooks/useAuth";
import useForm from "hooks/useForm";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetEntities } from "store/actions/master/entity";
import { reduxGetAllPolicyInfo } from "store/actions/master/policy-information";
import { selectEntities } from "store/selectors/master/entity";
import { useTranslate } from "utils/useTranslation";

const AccountFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const _entity_id = user.entity[0]?.id;
  const entityType =
    user.entity[0]?.entity_type?.name == "Intermediary" ||
    user.entity[0]?.entity_type?.name == "Insurance";
  const [entityId, setEntityId] = useState<string>("");
  const entities = useSelector(selectEntities)?.data;
  const [policyStatus, setPolicyStatus] = useState<string>("");

  let un_insured = ''
  // translate("account", "policy_status.uninsured").toUpperCase();
  let active = ''
  // translate("account", "policy_status.active").toUpperCase();
  let cancelled = ''
  // translate("account", "policy_status.cancelled").toUpperCase();
  let inactive = ''
  // translate("account", "policy_status.inactive").toUpperCase();
  let expired =''
  //  translate("account", "policy_status.expired").toUpperCase();

  const policyStatusOptions: any[] = [
    { key: "ACTIVE", label: active },
    { key: "CANCELLED", label: cancelled },
    { key: "INVALID", label: inactive },
    { key: "EXPIRED", label: expired },
    { key: "UNINSURED", label: un_insured },
  ];

  useEffect(() => {
    dispatch(reduxGetEntities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm({
    defaultValues: {
      risk_id: "",
      entity_id: "",
      cert_number: "",
      policy_date_from: "",
      policy_end_from: "",
      status: "",
    },
  });

  const handleEntityChange = (e) => {
    setEntityId(e.target.value);
    methods.setValue("entity_id", e.target.value);
  };

  const handlePolicyStatusChange = (e) => {
    setPolicyStatus(e.target.value);
    methods.setValue("status", e.target.value);
  };

  const handleDateChange = (name, date) => {
    methods.setValue(name, date, { shouldValidate: true });
  };

  const onSubmit = methods.handleSubmit((values: any) => {
    const { entity_id, risk_id, cert_number, status, date_from, date_to } =
      values;

    const params: GetPolicyInfoParams = {
      entity_id:
        _entity_id && entityType
          ? _entity_id
          : entity_id
          ? entity_id
          : undefined,
      risk_id: risk_id ? risk_id : undefined,
      cert_number: cert_number ? cert_number : undefined,
      status: status ? status : undefined,
      date_from: date_from ? (new Date(date_from) as any as string) : undefined,
      date_to: date_to ? (new Date(date_to) as any as string) : undefined,
    };

    dispatch(reduxGetAllPolicyInfo(params));
  });

  const clearFilters = () => {
    methods.reset();
    setEntityId("");
    setPolicyStatus("");
    methods.setValue("entity_id", "");
    methods.setValue("status", "");
    dispatch(reduxGetAllPolicyInfo({ entity_id: _entity_id }));
  };

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
        {translate("account", "filter_Account.title")}
      </Typography>

      <FormProvider {...{ methods, onSubmit }}>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          {!entityType && (
            <RHFSelect
              name="entity_id"
              label={translate("account", "filter_account.form.entity" as any)}
              onChange={handleEntityChange}
              value={entityId}
            >
              {entities?.map((insurance, index) => (
                <MenuItem
                  key={`insurance-${insurance.id}-${index}`}
                  value={insurance.id}
                >
                  {insurance.name}
                </MenuItem>
              ))}
            </RHFSelect>
          )}

          <RHFTextField
            name="risk_id"
            label={translate("account", "filter_account.form.risk" as any)}
            variant="outlined"
          />

          <RHFTextField
            name="cert_number"
            label={translate("account", "filter_account.form.cert" as any)}
            variant="outlined"
            size="medium"
          />

          <RHFSelect
            name="status"
            label={translate("account", "filter_account.form.status" as any)}
            onChange={handlePolicyStatusChange}
            value={policyStatus}
          >
            {policyStatusOptions?.map((status, index) => (
              <MenuItem key={`policy-${index}`} value={status.key}>
                {status.label}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFDatePicker
            name="date_from"
            label={translate("account", "filter_account.form.date_from" as any)}
            onChange={(date) => handleDateChange("date_from", date)}
          />
          <RHFDatePicker
            name="date_to"
            label={translate("account", "filter_account.form.date_to" as any)}
            onChange={(date) => handleDateChange("date_to", date)}
          />

          <Stack gap={1}>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              size="small"
              sx={{ width: 100 }}
            >
              {translate("account", "filter_Account.form.btn.filter")}
            </LoadingButton>

            <Button
              type="button"
              onClick={clearFilters}
              variant="outlined"
              fullWidth
              size="small"
              sx={{ width: 100 }}
            >
              {translate("account", "filter_Account.form.btn.clear")}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

type AccountFilterForm = {
  risk_id: string;
  entity_id: string;
  cert_number: string;
  date_from: string;
  date_to: string;
  status: string;
};

export default AccountFilterForm;
