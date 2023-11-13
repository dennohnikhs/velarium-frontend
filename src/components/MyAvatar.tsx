// hooks
// utils
// import useAuth from "hooks/useAuth";
import createAvatar from "utils/createAvatar";
//
import Avatar, { Props as AvatarProps } from "./Avatar";
import { useSelector } from "react-redux";
import { selectAuthUser } from "store/selectors/auth";
import Menu from "@mui/material/Menu";
import Iconify from "./Iconify";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useDispatch } from "store";
import { reduxLogoutUser } from "store/actions/auth";
import { capitalCase } from "change-case";
import { useTranslate } from "utils/useTranslation";

export default function MyAvatar({ ...other }: AvatarProps) {
  const authUser = useSelector(selectAuthUser)?.user;

  const createUsername = (
    firstName: string | null,
    lastName: string | null
  ) => {
    const username =
      firstName && lastName
        ? `${firstName} ${lastName}`
        : firstName
        ? firstName
        : lastName
        ? lastName
        : null;
    return username ? capitalCase(username) : null;
  };

  const displayName = authUser.first_name ?? authUser.email;
  const username = createUsername(authUser.first_name, authUser.last_name);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(reduxLogoutUser());

  const translate = useTranslate();

  return (
    <>
      <Avatar
        src={""}
        alt=""
        color={!displayName ? "default" : createAvatar(displayName).color}
        onClick={handleClick}
        {...other}
      >
        {createAvatar(displayName).name}
      </Avatar>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1))",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {username && (
          <MenuItem
            sx={{
              gap: 1,
              cursor: "default",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Iconify icon="fluent:person-20-regular" width={24} height={24} />
            {username}
          </MenuItem>
        )}

        <MenuItem
          sx={{
            gap: 1,
            cursor: "default",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <Iconify icon="circum:mail" width={24} height={24} />
          {authUser.email}
        </MenuItem>

        {authUser.entity[0]?.name && (
          <MenuItem
            sx={{
              gap: 1,
              cursor: "default",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Iconify icon="mdi:building" width={24} height={24} />
            {authUser.entity[0]?.name}
          </MenuItem>
        )}

        <Divider />

        <MenuItem sx={{ gap: 1 }} onClick={handleLogout}>
          <Iconify icon="ant-design:logout-outlined" width={24} height={24} />
          {translate("common", "navbar.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}
