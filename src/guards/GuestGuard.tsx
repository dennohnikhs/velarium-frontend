import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "store/selectors/auth";

type Props = {
  children: React.ReactNode;
};

const GuestGuard: FunctionComponent<Props> = ({ children }) => {
  const { isAuthenticated } = useSelector(selectAuthUser);
  const { replace, query } = useRouter();
  const nextUrl = (query.next as string) || "/dashboard/";

  useEffect(() => {
    if (isAuthenticated) {
      // take user to dashboard

      replace(nextUrl);
    }
  }, [isAuthenticated, replace, nextUrl]);

  if (isAuthenticated) return null;

  return <>{children}</>;
};

export default GuestGuard;
