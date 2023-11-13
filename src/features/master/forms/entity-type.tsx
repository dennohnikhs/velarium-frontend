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
  reduxAddEntityType,
  reduxUpdateEntityType,
} from "store/actions/master/entity-types";
import { useTranslate } from "utils/useTranslation";

const EntityTypeDialog = forwardRef<EntityTypeDialogRef>(
  function EntityTypeDialog(_, ref) {
    const dispatch = useDispatch();
    const translate = useTranslate();
    const { enqueueSnackbar } = useNotifications();
    const [open, setOpen] = useState(false);
    const [entityTypeValues, setEntityTypeValues] =
      useState<EntityTypeFormValues | null>();

    useImperativeHandle(ref, () => ({
      open: (values) => {
        setOpen(true);
        if (values) {
          setEntityTypeValues(values);
        }
      },
    }));

    const fields: FormField[] = [
      {
        name: "name",
        type: "text",
        label: `${translate("entity-type", "dialog.fields.name")}`,
        rules: [{ type: "required", message: "Name is required" }],
        width: "100%",
        value: entityTypeValues?.name ?? "",
      },
      {
        name: "description",
        type: "textarea",
        label: `${translate("entity-type", "dialog.fields.description")}`,
        rules: [{ type: "required", message: "Description is required" }],
        width: "100%",
        multiline: true,
        rows: 4,
        value: entityTypeValues?.description ?? "",
      },
    ];

    const validationSchema = generateValidationSchema(fields);

    const handleClose = () => {
      setOpen(false);
      setEntityTypeValues(null);
    };

    const handleSubmit = (values) => {
      const action = entityTypeValues?.id
        ? reduxUpdateEntityType
        : reduxAddEntityType;
      if (values)
        dispatch(action({ ...values, id: entityTypeValues?.id } as any)).then(
          (payload) => {
            if (isRejected(payload)) {
              const msg = `Failed to ${
                !entityTypeValues?.id ? "create" : "update"
              } entity type`;
              enqueueSnackbar(msg, {
                variant: "error",
              });
            } else {
              const msg = `Entity type ${
                !entityTypeValues?.id ? "created" : "updated"
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
          {!!entityTypeValues?.id ? `${translate("entity-type", "dialog.update_title")}` : `${translate("entity-type", "dialog.add_title")}`}
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

type EntityTypeFormValues = {
  id?: string;
  name: string;
  description: string;
};

export type EntityTypeDialogRef = {
  open: (values?: EntityTypeFormValues) => void;
};

export { EntityTypeDialog };
