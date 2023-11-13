import { useHasPermissions } from "hooks/useHasPermissions";
import { memo } from "react";
import ErrorPage from "./ErrorPage";

const PermissionsConsumer: FunctionComponent<Props> = ({
  permissions,
  children,
  statusCode = 403,
}) => {
  const hasPermissions = useHasPermissions(...permissions);

  if (hasPermissions) {
    return <>{children}</>;
  }

  return <ErrorPage {...{ statusCode }} />;
};

type Props = {
  children: React.ReactNode;
  permissions: string[];
  statusCode?: 401 | 403 | 404 | 500;
};

export default memo(PermissionsConsumer);
