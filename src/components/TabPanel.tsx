import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import cssStyles from "utils/cssStyles";

const TabPanel = ({ children, value, index, ...other }: PanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <TabPanelContainer>{children}</TabPanelContainer>}
    </div>
  );
};

const TabPanelContainer = styled(
  Box,
  {}
)(({}) => ({
  padding: "1em",
  ...cssStyles.glass({}),
}));

type PanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

export default TabPanel;
