import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider } from "components/hook-form";
import Page from "components/Page";
import {
  ForgotForm,
  forgotFormSchema,
  forgotFormValues,
} from "features/auth/forms/Forgot";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "store";
import { reduxRequestPasswordReset } from "store/actions/auth";

const ResetPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { enqueueSnackbar } = useNotifications();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(forgotFormSchema),
    defaultValues: forgotFormValues,
  });

  const onSubmit = methods.handleSubmit((values) => {
    if (values) {
      const { email } = values;
      return dispatch(reduxRequestPasswordReset({ username: email })).then(
        (response) => {
          if (isRejected(response)) {
            // show a toast
            enqueueSnackbar("Failed to send. Try again later", {
              variant: "error",
              autoHideDuration: 2000,
            });
          } else {
            enqueueSnackbar(
              "A password reset email has been sent to the email address",
              {
                variant: "success",
                autoHideDuration: 2000,
              }
            );
            methods.reset({ email: "" });
          }
        }
      );
    }
  });

  useEffect(() => {
    if (query.email) {
      methods.setValue("email", query.email as string);
    }
  }, [methods, query]);

  return (
    <AuthLayout
      title="Forgot Password ?"
      subtitle={{
        text: "To reset your password, enter your email address below :",
      }}
    >
      <FormProvider {...{ methods }}>
        <ForgotForm spacing={3}>
          <LoadingButton
            variant="contained"
            size="large"
            onClick={onSubmit}
            loading={methods.formState.isSubmitting}
          >
            Send Link
          </LoadingButton>
        </ForgotForm>
      </FormProvider>
    </AuthLayout>
  );
};

ResetPage.getLayout = (page) => (
  <Page title="Reset Password" disableTitle disableContainer>
    {page}
  </Page>
);

export default ResetPage;
