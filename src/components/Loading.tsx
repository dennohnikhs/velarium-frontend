import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React from "react";

const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({
  children,
  loading,
}) => {
  return (
    <LoadingContainer>
      {!!loading && <CircularProgress />}
      {!loading && children}
    </LoadingContainer>
  );
};

type LoadingComponentProps = {
  children?: React.ReactNode;
  loading?: boolean;
};

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: theme.palette.grey[100],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default LoadingComponent;
