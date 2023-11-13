import Stack from "@mui/material/Stack";
import { FormProvider } from "components/hook-form";
import RHFTextField from "components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "store";
import { isRejected } from "@reduxjs/toolkit";
import useNotifications from "hooks/useNotifications";
import LoadingButton from "@mui/lab/LoadingButton";
import { reduxCreateUser } from "store/actions/access/users";
import { FC } from "react";
import { useTranslate } from "utils/useTranslation";

const EntityAdminForm: FC<EntityAdminFormProps> = ({
  entity_id,
  handleClose,
}) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();

  const methods = useForm({
    defaultValues: entityAdminFormValues,
    resolver: yupResolver(entityAdminSchema),
  });

  const onSubmit = methods.handleSubmit((values: any) => {
    if (values && entity_id) {
      methods.setValue("entity_id", entity_id);

      dispatch(reduxCreateUser({ ...values, entity_id })).then((response) => {
        if (isRejected(response)) {
          enqueueSnackbar("Failed to create entity admin", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Entity admin created successfully");

          methods.reset();
          handleClose();
        }
      });
    }
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={2}>
          <RHFTextField
            name="first_name"
            label={translate("entity", "dialog.entity_user.firstname")}
          />

          <RHFTextField
            name="last_name"
            label={translate("entity", "dialog.entity_user.lastname")}
          />
        </Stack>
        <RHFTextField
          name="email"
          label={translate("entity", "dialog.entity_user.email")}
        />

        <LoadingButton
          type="submit"
          loading={methods.formState.isSubmitting}
          variant="contained"
          size="large"
        >
          {translate("entity", "dialog.submitButton")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

const entityAdminFormValues: {
  first_name: string;
  last_name: string;
  email: string;
  entity_id: string;
} = {
  first_name: "",
  last_name: "",
  email: "",
  entity_id: "",
};

const entityAdminSchema = yup.object({
  first_name: yup.string().nullable().trim(),
  last_name: yup.string().nullable().trim(),
  email: yup
    .string()
    .required("email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
  entity_id: yup.string(),
});

type EntityAdminFormProps = {
  entity_id: string;
  handleClose: () => void;
};

export default EntityAdminForm;
