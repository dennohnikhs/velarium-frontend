import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavConfig, NavConfigChild } from "hooks/useNavConfig";
import { poppins } from "theme/fonts";

const SidebarSubmenu: FunctionComponent<Props> = ({ current }) => {
  if (!current || !current.children?.length) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography fontFamily={poppins.fontFamily} variant="subtitle2">
        {current.title.toUpperCase()}
      </Typography>
    </Box>
  );
};

type Props = {
  current: NavConfig | undefined;
  currentChild: NavConfigChild | undefined;
};
export default SidebarSubmenu;
