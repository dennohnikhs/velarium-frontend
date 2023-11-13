import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { isRejected } from "@reduxjs/toolkit";
import api from "api/api";
import { DynamicForm, generateValidationSchema } from "components/dynamic-form";
import { FormField } from "components/dynamic-form/types";
import useNotifications from "hooks/useNotifications";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "store";
import {
  reduxAddLineOfBusiness,
  reduxUpdateLineOfBusiness,
} from "store/actions/master/line-of-business";
import { useTranslate } from "utils/useTranslation";

const LineOfBusinessDialog = forwardRef<LineOfBusinessDialogRef>(
  function LineOfBusinessDialog(_, ref) {
    const dispatch = useDispatch();
    const translate = useTranslate();
    const { enqueueSnackbar } = useNotifications();
    const [open, setOpen] = useState(false);
    const [_fields, setFields] = useState<FormField[] | any[]>();
    const [formValues, setFormValues] =
      useState<LineOfBusinessFormValues | null>();

    useImperativeHandle(ref, () => ({
      open: (values) => {
        setOpen(true);
        if (values) setFormValues(values);
      },
    }));

    const getFields = useCallback(async () => {
      const fieldsData = await api
        .get("/config/fields/")
        .then((res) => res.data);
      setFields(fieldsData);
    }, []);

    useEffect(() => {
      getFields();
    }, [getFields]);

    const _staticFields: FormField[] = [
      {
        name: "name",
        type: "text",
        label: `${translate("business", "dialog.fields.name")}`,
        value: formValues?.name ?? "",
        rules: [{ type: "required", message: "Name is required" }],
        width: "100%",
      },
      {
        name: "description",
        type: "textarea",
        label: `${translate("business", "dialog.fields.description")}`,
        value: formValues?.description ?? "",
        rules: [{ type: "required", message: "Description is required" }],
        width: "100%",
        rows: 4,
        multiline: true,
      },
    ];

    const fields = _fields?.length
      ? [..._staticFields, ..._fields]
      : [..._staticFields];

    const validationSchema = generateValidationSchema(fields);

    const handleClose = () => {
      setFormValues(null);
      setOpen(false);
    };

    const handleSubmit = (values) => {
      const action = formValues?.id
        ? reduxUpdateLineOfBusiness
        : reduxAddLineOfBusiness;
      if (values)
        dispatch(action({ ...values, id: formValues?.id })).then((payload) => {
          if (isRejected(payload)) {
            const msg = `Failed ${
              !formValues?.id ? "create" : "update"
            } Line of business`;
            enqueueSnackbar(msg, {
              variant: "error",
            });
          } else {
            const msg = `Line of business ${
              !formValues?.id ? "created" : "updated"
            } successfully`;
            enqueueSnackbar(msg);
            handleClose();
          }
        });
    };

    return (
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>
          {!!formValues?.id
            ? `${translate("business", "dialog.update_title")}`
            : `${translate("business", "dialog.add_title")}`}
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

export type LineOfBusinessFormValues = {
  id?: string;
  name: string;
  description: string;
};

export type LineOfBusinessDialogRef = {
  open?: (values?: LineOfBusinessFormValues) => void;
};

export { LineOfBusinessDialog };
