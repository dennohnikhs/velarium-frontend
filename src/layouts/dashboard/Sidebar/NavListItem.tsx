import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MuiCollapse from "@mui/material/Collapse";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiPaper from "@mui/material/Paper";
import Popper, { PopperProps } from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { Instance } from "@popperjs/core";
import Iconify from "components/Iconify";
import NextLink from "components/NextLink";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import useNavConfig, { NavConfig } from "hooks/useNavConfig";
import {
  cloneElement,
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SIDEBAR } from "utils/constants";
import cssStyles from "utils/cssStyles";
import { excludeProps } from "utils/functions";
import { pxToRem } from "utils/getFontValue";
import { joinPaths } from "utils/navigation";

const MIN_WIDTH = SIDEBAR.ICON_SIZE * SIDEBAR.MIN_WIDTH_FACTOR;

const popperOptions: PopperProps["popperOptions"] = {
  placement: "right",
  strategy: "absolute",
};

const NavListItem: FunctionComponent<NavListItemProps> = ({
  menu,
  collapse,
}) => {
  const { current } = useNavConfig();
  const active = current?.path === menu.path;

  if (!menu.children?.length) {
    const href = joinPaths(menu.path);
    return (
      <ListItem>
        <NextLink href={href?.toString()} passHref fullWidth>
          <ListItemButton {...{ active, collapse }}>
            <MenuIcon {...{ menu, collapse, active }} />
            {!collapse && (
              <ListItemText
                disableTypography
                sx={{
                  ...(active && {
                    color: "primary.main",
                  }),
                }}
              >
                {menu.title}
              </ListItemText>
            )}
          </ListItemButton>
        </NextLink>
      </ListItem>
    );
  }

  return <NestedNavListItems {...{ menu, active, collapse }} />;
};

const NestedNavListItems: FunctionComponent<NestedNavListItemsProps> = ({
  menu,
  active,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const {
    isCollapse: collapse,
    activeSideMenu,
    toggleActiveSideMenu,
    doNavigation,
    isMobile,
  } = useCollapseDrawer();
  const { currentChild } = useNavConfig();

  const open = activeSideMenu === menu.path;

  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      toggleActiveSideMenu(open ? null : menu.path);
    },
    [menu.path, toggleActiveSideMenu, open]
  );

  const onClose = useCallback(
    () => toggleActiveSideMenu(null),
    [toggleActiveSideMenu]
  );

  const children = useMemo(() => {
    return menu.children?.map((child, index) => {
      const active = currentChild?.path === child.path;
      let height = active ? 12 : 8;
      const color = active ? "primary.main" : "grey.700";

      const href = joinPaths(menu.path, child.path);
      const _isLast = menu.children.length - 1 === index;

      return (
        <NextLink passHref href={href?.toString()} key={child.title}>
          <MuiListItem
            onClick={() => doNavigation()}
            sx={{ ...(!collapse && { pl: 4 }) }}
          >
            <MuiListItemIcon
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Iconify
                icon="ion:ellipse"
                {...{ height, width: height, color }}
                className="indicator"
              />
            </MuiListItemIcon>

            <ListItemText sx={{ color }}>{child.title}</ListItemText>
          </MuiListItem>
        </NextLink>
      );
    });
  }, [menu.children, menu.path, currentChild?.path, collapse, doNavigation]);

  return (
    <Fragment>
      <ListItem>
        <ListItemButton {...{ active, onClick, collapse }}>
          <MenuIcon {...{ menu, collapse, active }} />
          {!collapse && (
            <Fragment>
              <ListItemText
                disableTypography
                sx={{
                  ...(active && {
                    color: "primary.main",
                  }),
                }}
              >
                {menu.title}
              </ListItemText>
              <div style={{ flexGrow: 1 }} />
            </Fragment>
          )}
          <IconWrapper {...{ open, collapse }} ref={setAnchorEl}>
            <Iconify
              icon="ion:chevron-down"
              color={active ? "primary.main" : "grey.700"}
            />
          </IconWrapper>
        </ListItemButton>
      </ListItem>

      {!collapse && (
        <Collapse in={open} sx={{ width: "100%", paddingLeft: 2 }}>
          {children}
        </Collapse>
      )}

      {collapse && !isMobile && (
        <RenderPopper {...{ anchorEl, open, onClose }}>{children}</RenderPopper>
      )}
    </Fragment>
  );
};

const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: excludeProps(["active", "inner", "collapse"]),
})<{ active: boolean; inner?: boolean; collapse: boolean }>(
  ({ inner, active, collapse, theme: { spacing, palette, alpha } }) => ({
    width: "100%",
    borderRadius: spacing(1),
    fontSize: pxToRem(14),
    whiteSpace: "nowrap",

    ...(collapse &&
      !inner && {
        height: MIN_WIDTH,
        width: MIN_WIDTH,
        alignItems: "center",
        justifyContent: "center",
      }),

    ...(inner && {
      paddingTop: spacing(1.2),
      paddingBottom: spacing(1.2),
    }),

    ...(active && {
      backgroundColor: alpha(palette.primary.lighter, 0.2),
    }),
  })
);

const ListItemIcon = styled(MuiListItemIcon, {
  shouldForwardProp: excludeProps(["collapse", "active"]),
})<{ collapse: boolean; active: boolean }>(
  ({ active, collapse, theme: { palette } }) => ({
    alignItems: "center",
    minWidth: 0,
    ...(collapse && {
      "&.MuiListItemIcon-root": {
        margin: 0,
      },
    }),

    ...(active && {
      color: palette.primary.main,
    }),
  })
);

const MenuIcon: FunctionComponent<{
  menu: NavConfig;
  collapse: boolean;
  active: boolean;
}> = ({ menu, collapse, active }) => {
  return (
    <ListItemIcon {...{ collapse, active }}>
      {cloneElement(menu.icon, {
        width: SIDEBAR.ICON_SIZE,
        height: SIDEBAR.ICON_SIZE,
      })}
    </ListItemIcon>
  );
};

const IconWrapper = styled(Box, {
  shouldForwardProp: excludeProps(["collapse"]),
})<{
  open: boolean;
  collapse: boolean;
}>(({ open, collapse, theme: { transitions } }) => ({
  transition: transitions.create("all", {
    duration: 200,
  }),
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: `rotate(${open ? "18" : ""}0deg)`,
  ...(!!collapse && {
    position: "absolute",
    transform: `rotate(${open ? "90" : "-90"}deg)`,
    right: -10,
  }),
}));

const ListItem = styled(MuiListItem)(({ theme: { spacing } }) => ({
  display: "flex",
  flexDirection: "column",

  "&:not(:last-child)": {
    marginBottom: spacing(0.5),
  },
}));

const Paper = styled(MuiPaper)(({ theme: { spacing } }) => ({
  ...cssStyles.glass(),
  padding: spacing(0),
  marginLeft: spacing(1),
  minWidth: 150,
}));

const RenderPopper = ({
  children,
  anchorEl,
  open,
  onClose,
}: {
  children: React.ReactNode;
  anchorEl: HTMLButtonElement;
  open: boolean;
  onClose: VoidFunction;
}) => {
  const { isCollapse: collapse } = useCollapseDrawer();
  const popperRef = useRef<Instance>(null);

  const rerender = useCallback(() => {
    if (!collapse) return null;

    return setTimeout(() => {
      popperRef.current?.forceUpdate();
    }, 200);
  }, [collapse]);

  useEffect(() => {
    let delay: NodeJS.Timeout | null = rerender();

    return () => {
      if (!!delay) clearTimeout(delay);
    };
  });
  return (
    <Popper {...{ anchorEl, open, popperOptions, popperRef }} transition>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            variant="outlined"
            sx={({ shadows }) => ({
              ...cssStyles.glass({
                saturate: 30,
                border: {
                  opacity: 0.2,
                },
              }),
              boxShadow: shadows[SIDEBAR.SHADOW],
              width: "100%",
            })}
          >
            <ClickAwayListener onClickAway={onClose}>
              <List sx={{ paddingX: 1 }}>{children}</List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

const Collapse = styled(MuiCollapse)(
  ({
    theme: {
      spacing,
      transitions: { create },
    },
  }) => ({
    "& .MuiListItemButton-root:first-of-type": {
      marginTop: spacing(0.6),
    },

    "& .MuiListItemButton-root": {
      marginBottom: spacing(0.6),
    },

    "& .indicator": {
      transition: create("all", {
        duration: 100,
      }),
    },
  })
);

//
type NavListItemProps = {
  collapse: boolean;
  menu: NavConfig;
  active: boolean;
};
type NestedNavListItemsProps = NavListItemProps;

export { NavListItem, NestedNavListItems };
