import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "store/selectors/auth";

const AuthGuard: FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const { isAuthenticated } = useSelector(selectAuthUser);
  const { replace, pathname } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      //  redirect the user to login

      replace(`/auth/login/?next=${pathname}`);
    }
  }, [isAuthenticated, replace, pathname]);

  if (isAuthenticated) return <>{props.children}</>;

  return null;
};

export default AuthGuard;
