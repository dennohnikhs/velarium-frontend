import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Iconify from "components/Iconify";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import Image from "next/image";
import { Fragment } from "react";
import { APPBAR, SIDEBAR } from "utils/constants";
import { excludeProps } from "utils/functions";

const SidebarHeader = () => {
  const { isCollapse: collapse, onToggleCollapse } = useCollapseDrawer();

  return (
    <Fragment>
      <Header collapse={collapse}>
        {!true && (
          <Fragment>
            <Image
              style={{
                height: "auto",
                width: 175,
              }}
              alt=""
              width={200}
              height={50}
              src="/images/logo-dark.png"
            />

            <div style={{ flexGrow: 1 }} />
          </Fragment>
        )}

        {!collapse && (
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, color: "primary.dark", paddingLeft: 2 }}
          >
          MyCoin
          </Typography>
        )}
        <TogleCollapse
          size="small"
          collapse={!!collapse}
          onClick={onToggleCollapse}
        >
          <Iconify
            {...(!!collapse && {
              height: 20,
              width: 20,
            })}
            icon={"ion:chevron-back-outline"}
          />
        </TogleCollapse>
      </Header>
      {!!collapse && (
        <Divider
          sx={{
            mt: 2,
            mb: 2.5,
            borderColor: "grey.50",
            borderRadius: 3,
          }}
        />
      )}
    </Fragment>
  );
};

const BUTTON_SIZE = 25;

const TogleCollapse = styled(IconButton, {
  shouldForwardProp: excludeProps(["collapse"]),
})<{
  collapse: boolean;
}>(
  ({
    theme: { palette, transitions, alpha, shape, breakpoints },
    collapse,
  }) => {
    return {
      height: BUTTON_SIZE,
      width: BUTTON_SIZE,
      "& svg ": {
        transition: transitions.create(["border-radius", "transform"], {
          duration: 200,
          delay: collapse ? 120 : 0,
          easing: "ease-in-out",
        }),
      },

      ...(!collapse && {
        position: "absolute",
        right: -BUTTON_SIZE / 2,
        [breakpoints.up("lg")]: {
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: palette.grey[300],
        },
        [breakpoints.down("lg")]: {
          display: "none",
        },
      }),

      backgroundColor: palette.background.neutral,
      ...(collapse && {
        borderRadius: shape.borderRadius,
        height: SIDEBAR.BUTTON_HEIGHT,
        width: "100%",
        backgroundColor: alpha(palette.common.white, 0.3),
        marginTop: "auto",

        "&:hover": {
          backgroundColor: alpha(palette.common.white, 0.6),
        },
        "& svg": {
          transform: "rotate(180deg)",
        },
      }),
    };
  }
);

const Header = styled(Box, {
  shouldForwardProp: excludeProps(["collapse"]),
})<{ collapse: boolean }>(({ collapse, theme: { spacing } }) => ({
  height: APPBAR.HEIGHT,

  ...(!collapse && {
    marginBottom: spacing(2),
    padding: spacing(2),
  }),
  ...(collapse && {
    paddingLeft: 0,
    paddingRight: 0,
  }),
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
}));

export default SidebarHeader;
