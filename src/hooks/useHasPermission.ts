import { usePermissionsContextProvider } from "contexts/PermissionsContext";
import { useMemo } from "react";

const useHasPermission = (permission: string) => {
  const { permissionsSet } = usePermissionsContextProvider();

  return useMemo(
    () => permissionsSet.has(permission),
    [permission, permissionsSet]
  );
};

export { useHasPermission };
