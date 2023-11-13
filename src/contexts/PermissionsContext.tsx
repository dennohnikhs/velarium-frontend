import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { store, useDispatch } from "store";
import { reduxGetSessionPermissions } from "store/actions/access/permissions";
import { selectSessionPermissions } from "store/selectors/access/permissions";

const PermissionsContext = createContext<State["permissions"]["session"]>(null);

function usePermissionsContext() {
  const dispatch = useDispatch();
  const { access_token } = store.getState().auth;

  const sessionPermissions = useSelector(selectSessionPermissions);

  const getSessionPermissions = useCallback(() => {
    if (access_token) {
      dispatch(reduxGetSessionPermissions());
    }
  }, [access_token, dispatch]);

  useEffect(() => {
    getSessionPermissions();
  }, [getSessionPermissions]);

  return useMemo(() => {
    return { sessionPermissions };
  }, [sessionPermissions]);
}

function PermissionsContextProvider({ children }) {
  const { sessionPermissions } = usePermissionsContext();

  return (
    <PermissionsContext.Provider value={sessionPermissions}>
      {children}
    </PermissionsContext.Provider>
  );
}

function usePermissionsContextProvider() {
  const sessionPermissions = useContext(PermissionsContext);

  const permissionsSet: Set<string> = useMemo(() => {
    return new Set(sessionPermissions.data ?? []);
  }, [sessionPermissions]);

  return { permissionsSet };
}

export {
  PermissionsContext,
  PermissionsContextProvider,
  usePermissionsContextProvider,
};
