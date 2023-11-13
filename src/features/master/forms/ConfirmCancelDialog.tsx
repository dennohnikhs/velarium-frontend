import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
import useForm from "hooks/useForm";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PolicyInfo } from "@models/master";
import { useDispatch } from "store";
import useNotifications from "hooks/useNotifications";
import { PolicyUpdatePayload } from "@models/api/master";
import { reduxUpdatePolicyInfo } from "store/actions/master/policy-information";
import { isRejected } from "@reduxjs/toolkit";
import { useTranslate } from "utils/useTranslation";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { selectCancellationReasons } from "store/selectors/master/cancellation-reasons";

const ConfirmCancelDialog = forwardRef<
  ConfirmCancelDialogRef,
  ConfirmCancelDialogProps
>(function ConfirmCancelDialog({ policy }, ref) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const [open, setOpen] = useState<boolean>(false);
  const translate = useTranslate();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const cancellationReasons = useSelector(selectCancellationReasons)?.data;

  const [reason, setReason] = useState<string>("");
  const handleReasonChange = (e) => {
    methods.setValue("cancellation_reason_id", e.target.value);
    setReason(e.target.value);
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cancellation_reason_id: "",
      comment: "",
    },
  });

  const resetReason = () => {
    methods.setValue("cancellation_reason_id", "");
    setReason("");
  };

  const handleClose = () => {
    setOpen(false);
    methods.reset();
    resetReason();
  };

  const onSubmit = methods.handleSubmit((values: any) => {
    if (values && policy) {
      const payload: PolicyUpdatePayload = {
        status: "CANCELLED",
        id: policy.id,
        ...values,
      };

      dispatch(reduxUpdatePolicyInfo({ ...payload })).then((payload) => {
        if (isRejected(payload)) {
          const msg = `Failed to update policy info`;
          enqueueSnackbar(msg, { variant: "error" });
        } else {
          const msg = `Policy info updated successfully`;
          enqueueSnackbar(msg);
          handleClose();
        }
      });
    }
  });

  return (
    <Dialog maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>{translate("policy", "cancel_policy.title")}</DialogTitle>
      <DialogContent>
        <Typography>
          {translate("policy", "cancel_policy.sub_title")}
        </Typography>

        <FormProvider {...{ methods, onSubmit }}>
          <Stack spacing={2}>
            <RHFSelect
              name="cancellation_reason_id"
              label={translate("policy", "cancel_policy.fields.reason")}
              onChange={handleReasonChange}
              value={reason}
              sx={{ mt: 2 }}
            >
              {cancellationReasons?.map((reason, index) => (
                <MenuItem key={index} value={reason.id}>
                  {reason.reason}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField
              name="comment"
              type="text"
              label={translate("policy", "cancel_policy.fields.comment")}
              multiline
              rows={3}
            />

            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={handleClose}
              >
                {translate("policy", "cancel_policy.btn.cancel")}
              </Button>

              <LoadingButton type="submit" variant="contained" size="large">
                {translate("policy", "cancel_policy.btn.proceed")}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
});

const schema = yup.object({
  cancellation_reason_id: yup.string().required("Reason is required"),
  comment: yup.string(),
});

type ConfirmCancelDialogProps = {
  policy?: PolicyInfo;
};

export type ConfirmCancelDialogRef = {
  open?: () => void;
  close?: () => void;
};

export default ConfirmCancelDialog;
