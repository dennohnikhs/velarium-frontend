import { Status } from "@models";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";
import { useMemo } from "react";
import { poppins } from "theme/fonts";
import { ColorSchema } from "theme/palette";

const StatusLabel = (props: { status: Status }) => {
  const color = useMemo<ColorSchema>(() => {
    switch (props.status) {
      case "PENDING":
        return "info";
      case "ACTIVE":
        return "success";
      case "INACTIVE":
        return "error";
      default:
        return "primary";
    }
  }, [props.status]);

  return <Label {...{ color }}>{capitalCase(props.status)}</Label>;
};

const Label = styled(Typography)<{
  color: ColorSchema;
}>(({ color, theme: { spacing, palette, alpha } }) => {
  return {
    background: alpha(palette[color].light, 1),
    color: palette[color].darker,
    fontSize: 11,
    fontFamily: poppins.fontFamily,
    fontWeight: poppins.fontWeights["500"],
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    borderRadius: spacing(1.5),
    paddingTop: spacing(0.3),
    paddingBottom: spacing(0.4),
    textAlign: "center",
    minWidth: 75,
  };
});

export default StatusLabel;
