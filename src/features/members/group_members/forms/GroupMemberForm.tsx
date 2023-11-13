/* eslint-disable react/display-name */
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFSelect } from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxAddGroupMember } from "store/actions/access/groupMembers";
import { reduxGetUsers } from "store/actions/access/users";
import { selectUsers } from "store/selectors/access/users";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";

const GroupMemberForm = forwardRef<
  GroupMemberFormDialogRef,
  GroupMemberFormProps
>(({ group_id }, ref) => {
  const methods = useForm({
    resolver: yupResolver(groupMemberFormSchema, {
      stripUnknown: true,
    }),
    defaultValues: groupMemberFormDefaultValues,
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const users = useSelector(selectUsers);
  const translate = useTranslate();

  useEffect(() => {
    dispatch(reduxGetUsers());
  }, [dispatch]);

  const open = methods.watch("open");
  useImperativeHandle(ref, () => ({
    open: () => {
      methods.reset({
        open: true,
        id: "",
        name: "",
        username: "",
      });
    },
  }));

  const onClose = () => {
    methods.reset({ open: false });
  };

  const onSubmit = methods.handleSubmit((values) => {
    if (values) {
      const { user_id } = values;

      return dispatch(reduxAddGroupMember({ group_id, user_id })).then(
        (payload) => {
          if (isRejected(payload)) {
            const msg = `Failed to add user to the group`;
            enqueueSnackbar(msg, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(`User added successfuly`, {
              variant: "success",
            });
            onClose();
          }
        }
      );
    }
  }, console.error);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>
          {translate("groups", "view.dialog.add_title")}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <RHFSelect
              name="user_id"
              label={translate("groups", "view.dialog.fields.name")}
              onChange={(e) =>
                methods.reset((values) => ({
                  ...values,
                  user_id: e.target.value,
                }))
              }
            >
              {users.data.map((user, index) => (
                <MenuItem key={`user-${user.id}-${index}`} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            loading={methods.formState.isSubmitting}
            variant="contained"
            fullWidth
            onClick={onSubmit}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
});

const groupMemberFormSchema = yup.object().shape({
  user_id: yup.string().required("This field is required"),
});

const groupMemberFormDefaultValues: GroupMemberFormValues = {
  open: false,
  id: "",
  name: "",
  username: "",
  group_id: "",
  user_id: "",
};

type GroupMemberFormValues = {
  id?: string;
  open: boolean;
  group_id: string;
  user_id: string;
  name: string;
  username: string;
};

type GroupMemberFormDialogRef = {
  open: (values?: any) => void;
};
type GroupMemberFormProps = {
  group_id: string;
  user: string;
};

export { GroupMemberForm };
export type { GroupMemberFormDialogRef };
