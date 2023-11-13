import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import useNavConfig from "hooks/useNavConfig";
import { APPBAR, SIDEBAR } from "utils/constants";
import cssStyles from "utils/cssStyles";
import { excludeProps } from "utils/functions";
import { NavListItem } from "./NavListItem";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  const { menus } = useNavConfig();
  const {
    isCollapse: collapse,
    width,
    isDesktop,
    isMobile,
    onToggleCollapse,
  } = useCollapseDrawer();

  return (
    <RootStyles
      onClose={onToggleCollapse}
      open={width !== 0}
      {...{
        collapse: collapse,
        ...(isDesktop && {
          variant: "persistent",
        }),
        ...(isMobile &&
          !collapse && {
            variant: "temporary",
          }),
      }}
    >
      <SidebarHeader />
      {((!collapse && isMobile) || !isMobile) && (
        <Box flex={1} className="content">
          <List disablePadding>
            {menus.map((menu) => (
              <NavListItem active {...{ menu, collapse }} key={menu.title} />
            ))}
          </List>
        </Box>
      )}
    </RootStyles>
  );
};

const RootStyles = styled(Drawer, {
  shouldForwardProp: excludeProps(["collapse"]),
})<{ collapse: boolean }>(
  ({
    collapse,
    theme: { transitions, alpha, palette, spacing, shadows, breakpoints },
  }) => ({
    "& .MuiDrawer-paper": {
      overflow: "visible",
      transition: transitions.create("width", {
        easing: "ease-in-out",
        duration: 120,
      }),
      width: collapse ? SIDEBAR.COLLAPSE_WIDTH : SIDEBAR.WIDTH,
      left: 0,
      bottom: 0,
      top: 0,
      display: "flex",
      flexDirecion: "row",
      backgroundColor: "black",
      paddingBottom: APPBAR.HEIGHT * 0,

      ...(!collapse && {
        ...cssStyles.glass(),
        [breakpoints.up("lg")]: {
          borderRightStyle: "dashed",
        },
      }),

      ...(collapse && {
        paddingLeft: spacing(1),
        border: "none",

        "& .content": {
          ...cssStyles.glass(),
          backgroundColor: "#9698a5",
          border: `.5px solid ${alpha(palette.common.white, 0.15)}`,
          boxShadow: shadows[SIDEBAR.SHADOW],
          flexGrow: 1,
          height: "100%",
          borderRadius: 10,
          alignItems: "center",
          display: "flex",

          ".MuiListItem-root ": {
            paddingLeft: spacing(1.5),
            marginTop: "auto",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
          },
        },
      }),
    },

    "&.MuiDrawer-modal .MuiPaper-root": {
      background: "#2e287e29",
    },
  })
);

export default Sidebar;
