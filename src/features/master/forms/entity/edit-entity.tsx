import { yupResolver } from "@hookform/resolvers/yup";
import { EntityPayload } from "@models/api/master";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFTextField } from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "store";
import { reduxUpdateEntity } from "store/actions/master/entity";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";

const EditEntityDialog = forwardRef<EditEntityDialogRef>(
  function EditEntityDialog(_, ref) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useNotifications();
    const [open, setOpen] = useState(false);
    const [entityValues, setEntityValues] = useState<EntityPayload>(null);
    const translate = useTranslate();

    const methods = useForm({
      defaultValues: editFormValues,
      resolver: yupResolver(baseSchema),
    });

    useImperativeHandle(ref, () => ({
      open: (values) => {
        setOpen(true);
        setEntityValues(values);

        if (values) {
          methods.setValue("name", values.name);
          methods.setValue("email", values.email);
          methods.setValue("physical_address", values.physical_address);
        }
      },
    }));

    const handleClose = () => {
      setOpen(false);
      methods.reset();
    };

    const onSubmit = methods.handleSubmit((values: EntityPayload) => {
      dispatch(reduxUpdateEntity({ ...values, id: entityValues.id })).then(
        (payload) => {
          if (isRejected(payload)) {
            enqueueSnackbar("Failed to update entity", { variant: "error" });
          } else {
            enqueueSnackbar("Entity updated successfully");
            handleClose();
          }
        }
      );
    });

    return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>{translate("entity", "dialog.update_title")}</DialogTitle>
        <DialogContent>
          <FormProvider {...{ methods, onSubmit }}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                <RHFTextField
                  name="name"
                  label={translate("entity", "dialog.fields.name")}
                />

                <RHFTextField
                  name="email"
                  label={translate("entity", "dialog.fields.email")}
                />
              </Stack>

              <RHFTextField
                name="physical_address"
                label={translate("entity", "dialog.fields.address")}
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
        </DialogContent>
      </Dialog>
    );
  }
);

const editFormValues: EntityPayload = {
  name: "",
  email: "",
  physical_address: "",
};

export const baseSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
  physical_address: yup.string().required("Physical address is required"),
});

export type EditEntityDialogRef = {
  open: (values?: EntityPayload) => void;
};

export default EditEntityDialog;
