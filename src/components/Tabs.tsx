import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import TabPanel from "components/TabPanel";
import React, { ReactNode, useState } from "react";
import cssStyles from "utils/cssStyles";

const TabsComponent = ({ tabs }: TabsComponentProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <RootStyles>
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="tabs"
        >
          {tabs.map(({ title }, i) => (
            <Tab key={`${title}-${i}`} label={title} disableRipple />
          ))}
        </StyledTabs>
      </Box>
      {tabs.map(({ title, component }, i) => (
        <TabPanel key={`${title}-${i}`} value={value} index={i}>
          {component}
        </TabPanel>
      ))}
    </RootStyles>
  );
};

const RootStyles = styled(
  Box,
  {}
)(({}) => ({
  ...cssStyles.glass({
    opacity: 0.6,
    bg: "#ffffff",
    border: {
      opacity: 0.3,
    },
    saturate: 30,
  }),
  width: "100%",
  minHeight: "90vh",
  borderRadius: "0.5em",
}));

const StyledTabs = styled(
  Tabs,
  {}
)(({}) => ({
  [`& .${tabsClasses.scrollButtons}`]: {
    "&.Mui-disabled": { opacity: 0.3 },
  },
}));

type TabsComponentProps = {
  tabs: readonly tab[];
};

type tab = {
  title: string;
  component: ReactNode;
};

export default TabsComponent;
