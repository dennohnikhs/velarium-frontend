import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Iconify from "components/Iconify";
import LanguageSwitcher from "components/LanguageSwitcher";
import MyAvatar from "components/MyAvatar";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import useResponsive from "hooks/useResponsive";
import { APPBAR } from "utils/constants";
import cssStyles from "utils/cssStyles";
import { excludeProps } from "utils/functions";

const height = 20;

const Appbar = () => {
  const { width, onToggleCollapse } = useCollapseDrawer();

  const isNotLg = useResponsive("down", "lg");

  return (
    <RootStyles sidebarWidth={width}>
      {isNotLg && (
        <IconButton onClick={() => onToggleCollapse()}>
          <Iconify icon="eva:menu-2-fill" {...{ height, width: height }} />
        </IconButton>
      )}
      <div style={{ flexGrow: 1 }} />
      <LanguageSwitcher />
      <MyAvatar sx={{ ml: 2 }} />
    </RootStyles>
  );
};

const RootStyles = styled(AppBar, {
  shouldForwardProp: excludeProps(["sidebarWidth"]),
})<{
  sidebarWidth: number;
}>(({ theme: { spacing } }) => ({
  height: APPBAR.HEIGHT/1.5,
  right: 0,
  width: "auto",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  boxShadow: "none",
  background: "blue",
  left: 0,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  ...cssStyles.glass({
    saturate: 4,
    border: {
      opacity:2
    },
  }),
}));

export default Appbar;
