import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFSelect, RHFTextField } from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxCreateUser, reduxUpdateUser } from "store/actions/access/users";
import { reduxGetEntities } from "store/actions/master/entity";
import { selectEntities } from "store/selectors/master/entity";
import { getPrefix } from "utils/functions";
import { withId } from "utils/schema";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";

const UserForm: FunctionComponent<UserFormProps> = ({ prefix, isEditMode }) => {
  const getName = getPrefix(prefix);
  const dispatch = useDispatch();
  const entities = useSelector(selectEntities).data;

  useEffect(() => {
    dispatch(reduxGetEntities());
  }, [dispatch]);

  const entitiesData = entities.map((entity) => ({
    label: entity.name,
    value: entity.id,
  }));

  const options = {
    label: "label",
    val: "value",
    options: [...entitiesData],
    default: {
      label: "",
      value: "",
    },
  };
  const translate = useTranslate();

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} gap={2} pt={1}>
        <RHFTextField
          name={getName("first_name")}
          label={translate("users", "dialog.fields.firstname")}
          variant="outlined"
          fullWidth
          autoComplete="given-name"
        />
        <RHFTextField
          name={getName("last_name")}
          label={translate("users", "dialog.fields.lastname")}
          variant="outlined"
          fullWidth
          autoComplete="family-name"
        />
      </Stack>

      <RHFTextField
        type="email"
        name={getName("email")}
        required
        label={translate("users", "dialog.fields.email")}
        variant="outlined"
        size="medium"
        fullWidth
        autoComplete="email"
      />

      {!isEditMode && (
        <RHFSelect
          name={getName("entity_id")}
          label="Entity"
          options={options}
        />
      )}
    </Stack>
  );
};

const UserFormDialog = forwardRef<UserFormDialogRef>(function UserFormDialog(
  _,
  ref
) {
  const { enqueueSnackbar } = useNotifications();
  const [isEditMode, setIsEditMode] = useState(false);

  const schema = isEditMode
    ? userFormSchema
    : userFormSchema.concat(
        yup.object({ entity_id: yup.string().required("Entity is required") })
      );
  const translate = useTranslate();

  const methods = useForm<UserFormValues, any, UserFormValues>({
    resolver: yupResolver(schema, { stripUnknown: true }),
    defaultValues: userFormDefaultValues,
  });

  const id = methods.watch("id");

  const open = methods.watch("open");
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    open(values) {
      setIsEditMode(values ? true : false);
      methods.reset({
        ...userFormDefaultValues,
        ...values,
        open: true,
      });
    },
  }));

  const onSubmit = methods.handleSubmit((values) => {
    const isNew = !values.id;
    const action = !isNew ? reduxUpdateUser : reduxCreateUser;

    return dispatch(action(values as any)).then((payload) => {
      if (isRejected(payload)) {
        const msg = `Failed to ${isNew ? "create" : "update"} user`;
        enqueueSnackbar(msg, {
          variant: "error",
        });
      } else {
        const msg = `User ${isNew ? "created" : "updated"} successfuly`;
        enqueueSnackbar(msg);
        onClose();
      }
    });
  }, console.error);

  const onClose = useCallback(() => {
    methods.reset({
      ...methods.getValues(),
      open: false,
    });
  }, [methods]);

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <Dialog {...{ open, onClose }} fullWidth>
        <DialogTitle>
          {" "}
          {id
            ? `${translate("users", "dialog.update_title")}`
            : `${translate("users", "dialog.add_title")}`}
        </DialogTitle>
        <DialogContent>
          <UserForm prefix="" {...{ isEditMode }} />
          <LoadingButton
            sx={{ mt: 2 }}
            onClick={onSubmit}
            type="submit"
            loading={methods?.formState.isSubmitting}
            variant="contained"
            fullWidth
            size="large"
          >
            {id
              ? `${translate("users", "dialog.update_button")}`
              : `${translate("users", "dialog.submit_button")}`}
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
});

const userFormSchema = yup.object().shape(
  withId({
    email: yup.string().required("Email is required").nullable().trim(),
    first_name: yup.string().nullable().trim(),
    last_name: yup.string().nullable().trim(),
    entity_id: yup.string(),
  })
);

const userFormDefaultValues: UserFormValues = {
  open: false,
  email: "",
  first_name: null,
  last_name: null,
  entity_id: "",
};

type UserFormValues = {
  id?: string;
  open: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string;
  entity_id?: string;
};

type UserFormDialogRef = {
  open?: (values?: Partial<UserFormValues>) => void;
};

type UserFormProps = {
  prefix?: string;
  isEditMode?: boolean;
};

export { UserForm, UserFormDialog, userFormDefaultValues, userFormSchema };
export type { UserFormDialogRef, UserFormValues };
