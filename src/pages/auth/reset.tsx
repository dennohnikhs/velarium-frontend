import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormProvider } from "components/hook-form";
import Page from "components/Page";
import {
  ResetForm,
  resetFormSchema,
  resetFormValues,
} from "features/auth/forms/Reset";
import useForm from "hooks/useForm";
import AuthLayout from "layouts/AuthLayout";

const ResetPage: NextPageWithLayout = () => {
  const methods = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: resetFormValues,
  });

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle={{
        text: "To reset your password please enter your new password:",
      }}
    >
      <FormProvider {...{ methods }}>
        <ResetForm spacing={3}>
          <LoadingButton
            variant="contained"
            size="large"
            loading={methods.formState.isSubmitting}
          >
            Reset
          </LoadingButton>
        </ResetForm>
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
