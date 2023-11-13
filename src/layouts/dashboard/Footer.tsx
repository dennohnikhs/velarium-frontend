/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { APPBAR } from "utils/constants";
import cssStyles from "utils/cssStyles";
import { useTranslate } from "utils/useTranslation";

const Footer = () => {
  const translate = useTranslate();
  return (
    <RootStyles>
      <Stack direction="row" alignItems={"right"} justifyContent="right">
        <Typography variant="subtitle2">
          {translate("common", "copyright.title")}
        </Typography>
        <span style={{ fontSize: 18, marginLeft: 4, marginRight: 4 }}>
          &copy;
        </span>
        <Box
          sx={{
            height: APPBAR.HEIGHT / 2,
            width: "auto",
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
            src="/images/val-logo.jpeg"
          />
        </Box>
      </Stack>
    </RootStyles>
  );
};

const RootStyles = styled("footer")<{}>(({ theme: { spacing } }) => ({
  height: APPBAR.HEIGHT / 3,
  position: "fixed",
  right: 0,
  width: "auto",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  boxShadow: "none",
  background: "#9698a587",
  left: 0,
  bottom: 0,

  display: "flex",
  flexDirection: "row",
  textAlign: "right",
  justifyContent: "right",
  alignItems: "right",
  ...cssStyles.glass({
    saturate: 4,
    border: {
      opacity: 0.2,
    },
  }),
}));

export default Footer;
