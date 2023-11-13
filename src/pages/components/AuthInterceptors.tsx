import useInterceptorEffect from "hooks/useInterceptorEffect";
import React, { memo } from "react";

const AuthInterceptors = memo<AuthInterceptorsProps>(function AuthInterceptors({
  children,
}) {
  // Register axios interceptors

  useInterceptorEffect();

  return <>{children}</>;
});

type AuthInterceptorsProps = {
  children?: React.ReactNode;
};

export default AuthInterceptors;
