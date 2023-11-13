import LoadingComponent from "components/Loading";
import CreatePassword from "features/auth/forms/verify/CreatePassword";
import ResendLink from "features/auth/forms/verify/ResendLink";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectVerificationToken } from "store/selectors/auth";

const AuthTokenPage: NextPageWithLayout = () => {
  const router = useRouter();

  const tokenState = useSelector(selectVerificationToken);

  const { token } = router.query;

  console.log(token);

  if (tokenState.loading == true || !tokenState) return <LoadingComponent />;

  switch (tokenState.data?.status) {
    case "UNUSED":
      switch (tokenState.data.is_expired) {
        case false:
          return (
            <CreatePassword
              {...{ tokenState: tokenState, token: token as string }}
            />
          );
        case true:
          return (
            <ResendLink
              {...{
                canResend: true,
                token: token as string,
                resending: tokenState.data.resending,
              }}
            />
          );
      }

    case "FACED_OUT":
      return (
        <ResendLink
          {...{
            canResend: true,
            token: token as string,
            // tokenType: tokenState.data.type,
            resending: tokenState.data.resending,
          }}
        />
      );

    case "USED":
      return <ResendLink {...{ canResend: false }} />;
  }
};

AuthTokenPage.getLayout = (page) => (
  <AuthLayout
    title="Create new password"
    subtitle={{
      text: "Password must contain at least 1 uppercase letter. Minimum length is 8 characters.",
    }}
  >
    {page}
  </AuthLayout>
);
export default AuthTokenPage;
