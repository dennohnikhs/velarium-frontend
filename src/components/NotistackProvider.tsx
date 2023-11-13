import { IconifyIcon } from "@iconify/react";
import Box from "@mui/material/Box";
import { ButtonProps } from "@mui/material/Button";
import GlobalStyles from "@mui/material/GlobalStyles";
import IconButton from "@mui/material/IconButton";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { Fragment, ReactNode, useRef } from "react";
// theme
//
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

function SnackbarStyles() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <GlobalStyles
      styles={{
        "#__next": {
          "& .SnackbarContainer-root": {
            zIndex: 10000,
          },
          "& .SnackbarContent-root": {
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 50 : 800],
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            backgroundColor: theme.palette.grey[isLight ? 900 : 50],
            "&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo":
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up("md")]: {
              minWidth: 240,
            },
          },
          "& .SnackbarItem-message": {
            padding: "0 !important",
            fontWeight: theme.typography.fontWeightMedium,
            flexGrow: 1,
          },
          "& .SnackbarItem-action": {
            marginRight: 0,
            color: theme.palette.action.active,
            "& svg": { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

const NotistackProvider = ({ children }: Props) => {
  const notistackRef = useRef<SnackbarProvider>(null);

  const onClose = (key: SnackbarKey) => () => {
    // @ts-ignore
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <Fragment>
      <SnackbarStyles />
      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        iconVariant={{
          info: <SnackbarIcon icon={"eva:info-fill"} color="info" />,
          success: (
            <SnackbarIcon
              icon={"eva:checkmark-circle-2-fill"}
              color="success"
            />
          ),
          warning: (
            <SnackbarIcon icon={"eva:alert-triangle-fill"} color="warning" />
          ),
          error: <SnackbarIcon icon={"eva:alert-circle-fill"} color="error" />,
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon={"eva:close-fill"} />
          </IconButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </Fragment>
  );
};

export default NotistackProvider;

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: IconifyIcon | string;
  color: ButtonProps["color"];
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        bgcolor:
          color === "inherit"
            ? "inherit"
            : (theme) => alpha(theme.palette[color || "primary"].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  );
}
