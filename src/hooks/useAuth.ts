import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "store/selectors/auth";

const useAuth = () => {
  const user = useSelector(selectAuthUser);

  return useMemo(() => {
    return user;
  }, [user]);
};

export default useAuth;
