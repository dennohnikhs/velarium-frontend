import { VerificationTokenType } from "@models/auth";
import Lock from "@mui/icons-material/Lock";
import Refresh from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { isRejected } from "@reduxjs/toolkit";
import { authUrls } from "features/auth/urls";
import useNotifications from "hooks/useNotifications";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "store";
import { reduxResendVerificationToken } from "store/actions/auth";

const ResendLink: FunctionComponent<ResendLinkProps> = ({
  canResend,
  token,
  tokenType,
  resending,
}) => {
  const { enqueueSnackbar } = useNotifications();
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (canResend && token) {
      dispatch(reduxResendVerificationToken({ token, type: tokenType })).then(
        (response) => {
          if (isRejected(response)) {
            enqueueSnackbar("Failed to send. Try again later", {
              variant: "error",
              autoHideDuration: 2000,
            });
          } else {
            enqueueSnackbar("Link sent successfully", {
              variant: "success",
              autoHideDuration: 2000,
            });
            replace("/");
          }
        }
      );
    } else {
      // Take user to login
      replace(authUrls.login());
    }
  }, [canResend, dispatch, enqueueSnackbar, replace, token, tokenType]);

  return (
    <ErrorContainer>
      <Typography
        variant="body2"
        textAlign="center"
        component="p"
        color="error.main"
      >
        The link you followed is broken or is expired.{" "}
        {canResend && "Click the button below to get a new link"}
      </Typography>

      <LoadingButton
        sx={{ mt: 2 }}
        variant="contained"
        disableElevation
        startIcon={canResend ? <Refresh /> : <Lock />}
        onClick={handleClick}
        loading={resending === true}
      >
        {canResend ? "Resend link" : "Take me to login"}
      </LoadingButton>
    </ErrorContainer>
  );
};

const ErrorContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.error.lighter,
  borderRadius: theme.spacing(1),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

type ResendLinkProps = {
  canResend?: boolean;
  token?: string | null;
  tokenType?: VerificationTokenType | null;
  resending?: Loading;
};
export default ResendLink;
