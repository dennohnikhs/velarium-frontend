import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DynamicForm, generateValidationSchema } from "components/dynamic-form";
import { FormField } from "components/dynamic-form/types";
import { useDispatch } from "store";
import useNotifications from "hooks/useNotifications";
import {
  reduxAddVehicleModel,
  reduxUpdateVehicleModel,
} from "store/actions/master/vehicle-model";
import { isRejected } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectVehicleMakes } from "store/selectors/master/vehicle-make";
import { reduxGetVehicleMakes } from "store/actions/master/vehicle-makes";
import { useTranslate } from "utils/useTranslation";

const VehicleModelDialog = forwardRef<VehicleModelDialogRef>(
  function VehicleModelDialog(_, ref) {
    const translate = useTranslate()
    const dispatch = useDispatch();
    const vehicleMakes = useSelector(selectVehicleMakes);
    const { enqueueSnackbar } = useNotifications();
    const [open, setOpen] = useState(false);
    const [vehicleModelValues, setVehicleModelValues] =
      useState<VehicleModelFormValues | null>();

    useImperativeHandle(ref, () => ({
      open: (values) => {
        setOpen(true);
        if (values) {
          setVehicleModelValues(values);
        }
      },
    }));

    useEffect(() => {
      dispatch(reduxGetVehicleMakes());
    }, [dispatch]);

    const vehicleModelFields: FormField[] = [
      {
        name: "name",
        type: "text",
        label: `${translate("models", "dialog.fields.name")}`,
        rules: [{ type: "required", message: "Name is required" }],
        width: "100%",
        value: vehicleModelValues?.name ?? "",
      },
      {
        name: "make_id",
        type: "select",
        label: `${translate("models", "dialog.fields.make_id")}`,
        rules: [{ type: "required", message: "Make Id is required" }],
        width: "100%",
        options: vehicleMakes.data.map((make) => ({
          value: make.id,
          label: make.name,
        })),
        value: vehicleModelValues?.make_id ?? "",
      },
    ];

    const validationSchema = generateValidationSchema(vehicleModelFields);

    const handleClose = () => {
      setOpen(false);
      setVehicleModelValues(null);
    };

    const handleSubmit = (values) => {
      const action = vehicleModelValues?.id
        ? reduxUpdateVehicleModel
        : reduxAddVehicleModel;

      if (values)
        dispatch(action({ ...values, id: vehicleModelValues?.id })).then(
          (payload) => {
            if (isRejected(payload)) {
              const msg = `Failed to ${
                vehicleModelValues?.id ? "update" : "create"
              } vehicle model`;
              enqueueSnackbar(msg, { variant: "error" });
            } else {
              const msg = `Vehicle model ${
                vehicleModelValues?.id ? "updated" : "created"
              } successfully`;
              enqueueSnackbar(msg);
              handleClose();
            }
          }
        );
    };

    return (
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>
          {!!vehicleModelValues?.id ? `${translate("models", "dialog.update_title")}` : `${translate("models", "dialog.add_title")}`}
        </DialogTitle>
        <DialogContent>
          <DynamicForm
            direction={"column"}
            gap={2}
            fields={vehicleModelFields}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style={{ paddingTop: 10 }}
          ></DynamicForm>
        </DialogContent>
      </Dialog>
    );
  }
);

type VehicleModelFormValues = {
  id?: string;
  name: string;
  make_id: string;
};

export type VehicleModelDialogRef = {
  open?: (values?: VehicleModelFormValues) => void;
};

export { VehicleModelDialog };
