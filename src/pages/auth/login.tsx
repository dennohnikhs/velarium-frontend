import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFCheckbox } from "components/hook-form";
import NextLink from "components/NextLink";
import Page from "components/Page";
import {
  LoginForm,
  loginFormSchema,
  loginFormValues,
} from "features/auth/forms/login";
import { authUrls } from "features/auth/urls";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import AuthLayout from "layouts/AuthLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useDispatch } from "store";
import { reduxLoginUser } from "store/actions/auth";
import { useTranslate } from "utils/useTranslation";

const LoginPage: NextPageWithLayout = () => {
  /**
   * This function retrieves the dispatch function from the Redux store, the replace and query functions from the Next.js router,
   * and the enqueueSnackbar function from the useNotifications hook.
   * returns  An object containing the dispatch, replace, and query functions, as well as the enqueueSnackbar function.
   */
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const { enqueueSnackbar } = useNotifications();
  const translate = useTranslate();

  const methods = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: loginFormValues,
  });

  /**
   * Handles the submission of the login form by dispatching a redux action to log in the user.
   * {function} methods - The useForm hook's handleSubmit function.
   * returns None
   */

  const onSubmit = methods.handleSubmit(({ remember_me: _, ...data }: any) => {
    return dispatch(reduxLoginUser(data)).then((response) => {
      if (isRejected(response)) {
        // show a toast
        enqueueSnackbar("No active user found with the provided credentials.", {
          variant: "error",
        });
      }
    });
  });

  const handleForgotClick = (e: any) => {
    e.preventDefault();
    const username: string = methods.getValues("username");
    username.includes("@")
      ? replace({ pathname: authUrls.forgot(), query: { email: username } })
      : replace(authUrls.forgot());
  };

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <LoginForm spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <RHFCheckbox
            label={translate("auth", "remember_me")}
            name="remember_me"
          />
          <Typography variant="body2" component="div">
            <NextLink
              href={authUrls.forgot()}
              fontFamily="publicSans"
              fontWeight={500}
              color="primary.main"
              onClick={(e) => handleForgotClick(e)}
            >
              {translate("auth", "forgot_password")}
            </NextLink>
          </Typography>
        </Stack>

        <LoadingButton
          variant="contained"
          size="large"
          loading={methods.formState.isSubmitting}
          type="submit"
        >
          {translate("auth", "login_btn")}
        </LoadingButton>
      </LoginForm>
    </FormProvider>
  );
};

LoginPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <Page title="Login" disableTitle disableContainer>
      <AuthLayout title={translate("auth", "login.title")}>{page}</AuthLayout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth"])),
    },
  };
};

export default LoginPage;
