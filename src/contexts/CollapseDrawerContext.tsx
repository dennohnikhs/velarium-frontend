// @mui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useResponsive from "hooks/useResponsive";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SIDEBAR } from "utils/constants";

// ----------------------------------------------------------------------

export type CollapseDrawerContextProps = {
  isCollapse?: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: VoidFunction;
  onHoverEnter: VoidFunction;
  onHoverLeave: VoidFunction;
  width: number;
  isDesktop: boolean;
  isMobile: boolean;
  activeSideMenu: string | null;
  toggleActiveSideMenu(val: string | null): void;
  doNavigation(callback?: VoidFunction): void;
};

const initialState: CollapseDrawerContextProps = {
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
  width: SIDEBAR.WIDTH,
  isDesktop: false,
  isMobile: false,
  activeSideMenu: "",
  toggleActiveSideMenu: function (_val: string): void {},
  doNavigation() {},
};

const CollapseDrawerContext = createContext(initialState);

type CollapseDrawerProviderProps = {
  children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [collapse, setCollapse] = useState({
    click: !isMobile,
    hover: false,
    activeSideMenu: null,
  });

  const isDesktop = useResponsive("up", "lg");
  const isCollapse = collapse.click && !collapse.hover;

  useEffect(() => {
    if (isMobile && !isCollapse) {
      setCollapse((val) => ({
        ...val,
        click: true,
        hover: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleToggleCollapse = useCallback(() => {
    setCollapse((collapse) => ({ ...collapse, click: !collapse.click }));
  }, []);

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  const toggleActiveSideMenu: CollapseDrawerContextProps["toggleActiveSideMenu"] =
    useCallback((activeSideMenu) => {
      setCollapse((a) => ({ ...a, activeSideMenu }));
    }, []);

  const doNavigation = useCallback(() => {
    console.log("DO nav");
    setCollapse((a) => ({
      ...a,
      hover: false,
      click: false,
      ...(isCollapse
        ? {
            activeSideMenu: null,
          }
        : {}),
    }));
  }, [isCollapse]);

  const width = (() => {
    if (isMobile) return isCollapse ? 0 : SIDEBAR.WIDTH;
    if (!isDesktop) return 0;
    return isCollapse ? SIDEBAR.COLLAPSE_WIDTH : SIDEBAR.WIDTH;
  })();

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
        width,
        isDesktop,
        isMobile,
        activeSideMenu: collapse.activeSideMenu,
        toggleActiveSideMenu,
        doNavigation(callback) {
          callback?.();
          doNavigation();
        },
      }}
    >
      {children}
      {/* <div
        style={{ position: "fixed", right: 0, zIndex: 1231231, top: 0 }}
      ></div> */}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
