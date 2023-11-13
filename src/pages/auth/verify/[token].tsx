import LoadingComponent from "components/Loading";
import CreatePassword from "features/auth/forms/verify/CreatePassword";
import ResendLink from "features/auth/forms/verify/ResendLink";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { reduxGetVerificationToken } from "store/actions/auth";
import { selectVerificationToken } from "store/selectors/auth";

const AuthTokenPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tokenState = useSelector(selectVerificationToken);
  const isInitialized = useRef(false);

  const { token } = router.query;

  useEffect(() => {
    if (!isInitialized.current && token) {
      isInitialized.current = true;
      dispatch(reduxGetVerificationToken(token as string));
    }

    return () => {
      //console.log("UNMOUNTED");
    };
  }, [token, dispatch]);

  if (!isInitialized.current || tokenState.loading == true || !tokenState)
    return <LoadingComponent loading />;

  if (tokenState.loading === "error")
    return (
      <ResendLink
        {...{
          canResend: false,
        }}
      />
    );

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

AuthTokenPage.getLayout = (page) => {
  return (
    <AuthLayout
      title={"Account Verification"}
      subtitle={{
        text: "Lets verify your account",
      }}
    >
      {page}
    </AuthLayout>
  );
};

export default AuthTokenPage;
