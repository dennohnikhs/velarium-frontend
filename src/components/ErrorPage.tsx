import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { FC } from "react";
import cssStyles from "utils/cssStyles";

const ErrorPage: FC<Props> = ({ statusCode }) => {
  return (
    <Container alignItems="center" justifyContent="center" minHeight={"85vh"}>
      {statusCode === 401 ? (
        <>
          <Typography variant="h3" color="error">
            {statusCode}
          </Typography>
          <Typography variant="subtitle1" my={1}>
            Unauthorized.
          </Typography>
          <Typography variant="subtitle2">
            Sorry, you don not have sufficient permissions to view this page.
          </Typography>
        </>
      ) : statusCode === 403 ? (
        <>
          <Typography variant="h3" color="error">
            {statusCode}
          </Typography>
          <Typography variant="subtitle1" my={1}>
            Forbidden.
          </Typography>
          <Typography variant="subtitle2">
            Access to this page is denied.
          </Typography>
        </>
      ) : statusCode === 404 ? (
        <>
          <Typography variant="h3" color="error">
            {statusCode}
          </Typography>
          <Typography variant="subtitle1" my={1}>
            Page not found.
          </Typography>
          <Typography variant="subtitle2">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" color="error">
            {statusCode}
          </Typography>
          <Typography variant="subtitle1" my={1}>
            Internal server error.
          </Typography>
          <Typography variant="subtitle2">
            Sorry, there has been a glitch.
          </Typography>
        </>
      )}

      <Button
        LinkComponent={NextLink}
        href="/dashboard"
        variant="contained"
        sx={{ mt: 1 }}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

const Container = styled(
  Stack,
  {}
)(({}) => ({
  borderRadius: "1em",
  ...cssStyles.glass({
    border: false,
    opacity: 0.75,
  }),
}));

type Props = {
  statusCode: 401 | 403 | 404 | 500;
};

export default ErrorPage;
