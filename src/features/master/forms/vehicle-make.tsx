import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { isRejected } from "@reduxjs/toolkit";
import { DynamicForm, generateValidationSchema } from "components/dynamic-form";
import { FormField } from "components/dynamic-form/types";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "store";
import {
  reduxAddVehicleMake,
  reduxUpdateVehicleMake,
} from "store/actions/master/vehicle-makes";
import { useTranslate } from "utils/useTranslation";

const VehicleMakeDialog = forwardRef<VehicleMakeDialogRef>(
  function VehicleMakeDialog(_, ref) {
    const translate = useTranslate()
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useNotifications();
    const [open, setOpen] = useState(false);
    const [vehicleMakeValues, setVehicleMakeValues] =
      useState<VehicleMakeFormValues | null>();

    useImperativeHandle(ref, () => ({
      open: (values) => {
        setOpen(true);
        if (values) {
          setVehicleMakeValues(values);
        }
      },
    }));

    const fields: FormField[] = [
      {
        name: "name",
        type: "text",
        label: `${translate("vehicle-make", "dialog.fields.name")}`,
        rules: [{ type: "required", message: "Name is required" }],
        width: "100%",
        value: vehicleMakeValues?.name ?? "",
      },
    ];

    const validationSchema = generateValidationSchema(fields);

    const handleClose = () => {
      setOpen(false);
      setVehicleMakeValues(null);
    };

    const handleSubmit = (values) => {
      const action = vehicleMakeValues?.id
        ? reduxUpdateVehicleMake
        : reduxAddVehicleMake;
      if (values)
        dispatch(action({ ...values, id: vehicleMakeValues?.id } as any)).then(
          (payload) => {
            if (isRejected(payload)) {
              const msg = `Failed to ${
                !vehicleMakeValues?.id ? "create" : "update"
              } vehicle make`;
              enqueueSnackbar(msg, {
                variant: "error",
              });
            } else {
              const msg = `Vehicle make ${
                !vehicleMakeValues?.id ? "created" : "updated"
              } successfuly`;
              enqueueSnackbar(msg);
              handleClose();
            }
          }
        );
    };

    return (
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>
          {!!vehicleMakeValues?.id ? `${translate("vehicle-make", "dialog.update_title")}` : `${translate("vehicle-make", "dialog.add_title")}`}
        </DialogTitle>
        <DialogContent>
          <DynamicForm
            direction={"column"}
            gap={2}
            fields={fields}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style={{ paddingTop: 10 }}
          ></DynamicForm>
        </DialogContent>
      </Dialog>
    );
  }
);

type VehicleMakeFormValues = {
  id?: string;
  name?: string;
};

export type VehicleMakeDialogRef = {
  open: (values?: VehicleMakeFormValues) => void;
};

export { VehicleMakeDialog };
