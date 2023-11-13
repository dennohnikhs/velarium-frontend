import { styled } from "@mui/material/styles";
import Link from "next/link";
import { FontProps, Fonts, getFontProps } from "theme/fonts";
import { excludeProps } from "utils/functions";

const NextLink = styled(Link, {
  shouldForwardProp: excludeProps(["fullWidth", "underline"]),
})<Props>(({ fullWidth, color, underline, fontFamily, fontWeight }) => ({
  flexGrow: 1,
  textDecoration: underline ? "underline" : "none",
  fontFamily,

  ...getFontProps(fontFamily, fontWeight as any),

  ...(!color && { color: "inherit" }),

  ...(!!fullWidth && {
    width: "100%",
  }),
}));

type Props<T extends keyof Fonts = "poppins"> = {
  fullWidth?: boolean;
  underline?: boolean;
} & Partial<FontProps<T>>;

export default NextLink;
