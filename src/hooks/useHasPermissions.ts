import { usePermissionsContextProvider } from "contexts/PermissionsContext";
import { useMemo } from "react";

const useHasPermissions = (...permissions: string[]) => {
  const { permissionsSet } = usePermissionsContextProvider();

  return useMemo(
    () => permissions.every((permission) => permissionsSet.has(permission)),
    [permissions, permissionsSet]
  );
};

export { useHasPermissions };
