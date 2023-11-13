import { GetPolicyReportInfoParams } from "@models/master";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormProvider, RHFTextField } from "components/hook-form";
import useAuth from "hooks/useAuth";
import useForm from "hooks/useForm";
import { FC } from "react";
import { useDispatch } from "store";
import { reduxGetHistoricalPolicies } from "store/actions/master/historical-policies";
import { useTranslate } from "utils/useTranslation";

const PolicyReportFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const entity_id = user.entity[0]?.id;

  const methods = useForm({
    defaultValues: {
      risk_id: "",
    },
  });

  const onSubmit = methods.handleSubmit((values: FilterPolicyForm) => {
    const { risk_id } = values;

    const params: GetPolicyReportInfoParams = {
      risk_id: risk_id ? risk_id : undefined,
      entity_id,
      is_filter: true,
    };

    dispatch(reduxGetHistoricalPolicies(params));
  });

  const clearFilters = () => {
    methods.reset();
    dispatch(reduxGetHistoricalPolicies({ entity_id }));
  };

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
        {translate("policy", "filter_policy.report_title")}
      </Typography>

      <FormProvider {...{ methods, onSubmit }}>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <RHFTextField
            name="risk_id"
            label={translate("policy", "filter_policy.form.risk")}
            variant="outlined"
          />

          <Stack gap={1}>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              size="small"
              sx={{ width: 100 }}
            >
              {translate("policy", "filter_policy.form.btn.filter")}
            </LoadingButton>

            <Button
              type="button"
              onClick={clearFilters}
              variant="outlined"
              fullWidth
              size="small"
              sx={{ width: 100 }}
            >
              {translate("policy", "filter_policy.form.btn.clear")}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

type FilterPolicyForm = {
  risk_id: string;
};

export default PolicyReportFilterForm;
