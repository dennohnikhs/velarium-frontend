import { Permission } from "@models/access/permissions";
import Grid from "@mui/material/Grid";
import { sentenceCase } from "change-case";
import { RHFCheckbox } from "components/hook-form";

const GroupPermissionsInput: React.FC<GroupPermissionsInputProps> = ({
  permissions,
  getName,
}) => {
  return (
    <Grid container sx={{ mb: 1 }}>
      {permissions.map((permission) => (
        <Grid item key={permission.id} xs={6} sm={6} md={4}>
          <RHFCheckbox
            label={sentenceCase(permission.id)}
            name={getName(permission.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export type GroupPermissionsInputProps = {
  getName(name: string): string;
  permissions: Permission[];
};

export { GroupPermissionsInput };
