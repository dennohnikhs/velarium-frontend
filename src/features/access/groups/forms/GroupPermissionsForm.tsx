import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Iconify from "components/Iconify";
import IconButtonAnimate from "components/animate/IconButtonAnimate";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectGroupedPermissions } from "store/selectors/access/permissions";
import { getPrefix } from "utils/functions";
import * as yup from "yup";
import { GroupPermissionsInput } from "./GroupPermissionsInputs";

const COLLAPSE_HEIGHT = 65;

const GroupPermissionsForm: React.FC<GroupPermissionsProps> = ({ prefix }) => {
  const getName = getPrefix(prefix, "permission_ids");
  const { permissions } = useSelector(selectGroupedPermissions);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return Object.entries(permissions);
  }, [permissions]);

  const isOpen = useCallback(
    (key: string, index: number) => {
      if (!openKey && index == 0) return true;

      return openKey === key;
    },
    [openKey]
  );

  const toggleKey = (key: string, index: number) => {
    return () => {
      const isActive = isOpen(key, index);
      setOpenKey(isActive ? "__none__" : key);
    };
  };

  return (
    <Box>
      {grouped.map(([key, permissions], index) => {
        const isActive = isOpen(key, index);
        const isLast = index == grouped.length - 1;
        return (
          <Paper key={key} sx={{ mb: isLast ? 0 : 4 }}>
            <Collapse
              collapsedSize={COLLAPSE_HEIGHT}
              in={isActive}
              sx={{ px: 4 }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{ height: COLLAPSE_HEIGHT }}
              >
                <Typography sx={{ flexGrow: 1 }} variant="subtitle2">
                  {key}
                </Typography>

                <IconButtonAnimate
                  onClick={toggleKey(key, index)}
                  sx={{
                    rotate: isActive ? "180deg" : 0,
                    transition: "all .5s",
                  }}
                >
                  <Iconify icon="eva:chevron-down-outline" />
                </IconButtonAnimate>
              </Box>

              <GroupPermissionsInput {...{ permissions, getName }} />
            </Collapse>
          </Paper>
        );
      })}
    </Box>
  );
};

const groupPermissionsSchema = yup.object().shape({
  permission_ids: yup.object().nullable(),
});
const groupPermissionsDefault: GroupPermissionsValues = {
  permission_ids: {},
};

export type GroupPermissionsProps = {
  prefix?: string;
};
export type GroupPermissionsValues = {
  permission_ids: Record<string, boolean>;
};

export {
  GroupPermissionsForm,
  groupPermissionsDefault,
  groupPermissionsSchema,
};
