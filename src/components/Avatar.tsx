import MUIAvatar, { AvatarProps } from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type AvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

// ----------------------------------------------------------------------

export interface Props extends AvatarProps {
  color?: AvatarColor;
}

const Avatar = forwardRef<HTMLDivElement, Props>(
  ({ color = "default", children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === "default") {
      return (
        <MUIAvatar ref={ref} sx={sx} {...other}>
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  }
);
Avatar.displayName = "Avatar";

export default Avatar;
