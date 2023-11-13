import { yupResolver } from "@hookform/resolvers/yup";
import {
  GetVerificationTokenResponse,
  VerifyAccountPayload,
} from "@models/api/auth";
import { VerificationTokenType } from "@models/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFTextField } from "components/hook-form";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
import { authUrls } from "features/auth/urls";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { useRouter } from "next/router";
import { useDispatch } from "store";
import {
  reduxChangePasswordReset,
  reduxVerifyAccount,
} from "store/actions/auth";
import * as yup from "yup";

const CreatePassword: FunctionComponent<CreatePasswordProps> = ({
  tokenState,
  token,
}) => {
  const { enqueueSnackbar } = useNotifications();
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = methods.handleSubmit((values) => {
    if (values) {
      const { type, password, confirm_password, username } = values;
      switch (tokenState?.data?.type) {
        case "INITIAL_VERIFICATION":
          dispatch(
            reduxVerifyAccount({
              type,
              password,
              confirm_password,
              username,
              token: token,
            })
          ).then((response) => {
            if (isRejected(response)) {
              const errors: any = response.payload;

              if (errors.password) {
                methods.setError("password", {
                  type: "server",
                  message: errors.password,
                });
              } else {
                enqueueSnackbar("Error occured. Try again later", {
                  variant: "error",
                });
              }
            } else {
              enqueueSnackbar("Updated successfully", {
                variant: "success",
              });
            }
            replace(authUrls.login());
          });
          break;
        case "PASSWORD_RESET":
          dispatch(
            reduxChangePasswordReset({
              token,
              password,
            })
          ).then((response) => {
            if (isRejected(response)) {
              const errors: any = response.payload;

              if (errors.password) {
                methods.setError("password", {
                  type: "server",
                  message: errors.password,
                });
              } else {
                enqueueSnackbar("Error occured. Try again later", {
                  variant: "error",
                  autoHideDuration: 2000,
                });
              }
            } else {
              enqueueSnackbar("Your password has been reset successfully.", {
                variant: "success",
                autoHideDuration: 2000,
              });
              replace(authUrls.login());
            }
          });
          break;

        default:
          return;
      }
    }
  });

  return (
    <>
      <FormProvider {...{ methods, onSubmit }}>
        <Stack spacing={3}>
          {tokenState.data?.type === "INITIAL_VERIFICATION" &&
            !tokenState.data?.has_username && (
              <RHFTextField name="username" label="Username (optional)" />
            )}
          <RHFPasswordField name="password" label="Password" required />
          <RHFPasswordField
            name="confirm_password"
            label="Confirm Password"
            required
          />
          <LoadingButton
            loading={methods.formState.isSubmitting}
            variant="contained"
            size="large"
            type="submit"
          >
            {tokenState.data?.type === "INITIAL_VERIFICATION"
              ? "Verify Account"
              : "Reset Password"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
};

type CreatePasswordProps = {
  tokenState: {
    loading: Loading;
    data: GetVerificationTokenResponse & {
      type?: VerificationTokenType;
      resending?: Loading;
      has_username?: boolean;
    };
  };
  token: string;
};

const defaultValues: VerifyAccountPayload = {
  password: "",
  confirm_password: "",
  username: "",
};

const schema = yup.object().shape({
  username: yup.string().nullable(),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters`)
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([undefined, null, "", yup.ref("password")], "Passwords must match"),
});

export default CreatePassword;
