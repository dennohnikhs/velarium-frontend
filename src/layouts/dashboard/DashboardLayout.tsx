import { styled } from "@mui/material/styles";
import { PermissionsContextProvider } from "contexts/PermissionsContext";
import AuthGuard from "guards/AuthGuard";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import { FC } from "react";
import { APPBAR } from "utils/constants";
import { excludeProps } from "utils/functions";
import Appbar from "./Appbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  disablePadding?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  disablePadding,
}) => {
  const { width } = useCollapseDrawer();
  return (
    <AuthGuard>
      <PermissionsContextProvider>
        <Appbar />
        <Sidebar />
        <Main sidebarWidth={width} disablePadding={!!disablePadding}>
          {children}
        </Main>
        <Footer />
      </PermissionsContextProvider>
    </AuthGuard>
  );
};

const Main = styled("main", {
  shouldForwardProp: excludeProps(["sidebarWidth", "disablePadding"]),
})<{ sidebarWidth: number; disablePadding?: boolean }>(
  ({ sidebarWidth, theme: { transitions, breakpoints } }) => ({
    paddingTop: APPBAR.HEIGHT,
    paddingBottom: APPBAR.HEIGHT,
    // background: "#636a815c", // messes with form visibility
    transition: transitions.create("all", {
      duration: 180,
    }),

    [breakpoints.up("lg")]: {
      paddingLeft: sidebarWidth + APPBAR.HEIGHT / 2,
    },
  })
);

export default DashboardLayout;
